import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  onSnapshot,
  arrayUnion,
  increment
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { INITIAL_BLOGS } from '../constants';

const BLOGS_COLLECTION = 'blogs';

export const blogService = {
  // Get all blogs from Firestore
  getBlogs: async () => {
    try {
      const blogsRef = collection(db, BLOGS_COLLECTION);
      const q = query(blogsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        // Initialize with default blogs if collection is empty
        for (const blog of INITIAL_BLOGS) {
          await addDoc(collection(db, BLOGS_COLLECTION), {
            ...blog,
            createdAt: new Date(blog.createdAt).toISOString()
          });
        }
        return INITIAL_BLOGS;
      }
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching blogs from Firebase:', error);
      throw error;
    }
  },

  // Subscribe to real-time updates
  subscribeToBlogs: (callback) => {
    try {
      const blogsRef = collection(db, BLOGS_COLLECTION);
      const q = query(blogsRef, orderBy('createdAt', 'desc'));
      
      return onSnapshot(q, (snapshot) => {
        const blogs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(blogs);
      }, (error) => {
        console.error('Error in subscription:', error);
      });
    } catch (error) {
      console.error('Error setting up subscription:', error);
      return () => {};
    }
  },

  // Save a blog (create or update)
  saveBlog: async (blog) => {
    try {
      if (blog.id && !blog.id.startsWith('temp_')) {
        // Update existing blog
        const blogRef = doc(db, BLOGS_COLLECTION, blog.id);
        const { id: _blogId, ...blogData } = blog;
        await updateDoc(blogRef, blogData);
        return blog;
      } else {
        // Create new blog
        const { id: _tempId, ...blogData } = blog;
        const docRef = await addDoc(collection(db, BLOGS_COLLECTION), {
          ...blogData,
          createdAt: new Date().toISOString()
        });
        return { ...blogData, id: docRef.id };
      }
    } catch (error) {
      console.error('Error saving blog to Firebase:', error);
      throw error;
    }
  },

  // Delete a blog
  deleteBlog: async (id) => {
    try {
      await deleteDoc(doc(db, BLOGS_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting blog from Firebase:', error);
      throw error;
    }
  },

  // Get a single blog by ID
  getBlogById: async (id) => {
    try {
      const blogRef = doc(db, BLOGS_COLLECTION, id);
      const blogSnap = await getDoc(blogRef);
      if (blogSnap.exists()) {
        return { id: blogSnap.id, ...blogSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error fetching blog from Firebase:', error);
      throw error;
    }
  },

  // Toggle like on a blog
  toggleLike: async (id) => {
    try {
      const blogRef = doc(db, BLOGS_COLLECTION, id);
      await updateDoc(blogRef, {
        likes: increment(1)
      });
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  },

  // Toggle bookmark (stored in Firestore user document)
  toggleBookmark: async (blogId, userId) => {
    if (!userId) return false;
    
    try {
      const userBookmarksRef = doc(db, 'userBookmarks', userId);
      const userBookmarksSnap = await getDoc(userBookmarksRef);
      
      if (userBookmarksSnap.exists()) {
        const bookmarks = userBookmarksSnap.data().bookmarks || [];
        const isBookmarked = bookmarks.includes(blogId);
        
        if (isBookmarked) {
          await updateDoc(userBookmarksRef, {
            bookmarks: bookmarks.filter(id => id !== blogId)
          });
          return false;
        } else {
          await updateDoc(userBookmarksRef, {
            bookmarks: arrayUnion(blogId)
          });
          return true;
        }
      } else {
        // Create new bookmark document
        await addDoc(collection(db, 'userBookmarks'), {
          userId: userId,
          bookmarks: [blogId]
        });
        return true;
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      return false;
    }
  },

  // Check if a blog is bookmarked by user
  isBookmarked: async (blogId, userId) => {
    if (!userId) return false;
    
    try {
      const userBookmarksRef = doc(db, 'userBookmarks', userId);
      const userBookmarksSnap = await getDoc(userBookmarksRef);
      
      if (userBookmarksSnap.exists()) {
        const bookmarks = userBookmarksSnap.data().bookmarks || [];
        return bookmarks.includes(blogId);
      }
      return false;
    } catch (error) {
      console.error('Error checking bookmark:', error);
      return false;
    }
  },

  // Get user's bookmarked blogs
  getUserBookmarks: async (userId) => {
    if (!userId) return [];
    
    try {
      const userBookmarksRef = doc(db, 'userBookmarks', userId);
      const userBookmarksSnap = await getDoc(userBookmarksRef);
      
      if (userBookmarksSnap.exists()) {
        return userBookmarksSnap.data().bookmarks || [];
      }
      return [];
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      return [];
    }
  },

  // Increment view count
  incrementView: async (id) => {
    try {
      const blogRef = doc(db, BLOGS_COLLECTION, id);
      await updateDoc(blogRef, {
        views: increment(1)
      });
    } catch (error) {
      console.error('Error incrementing view:', error);
      throw error;
    }
  },

  // Add a comment to a blog
  addComment: async (blogId, comment) => {
    const newComment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    try {
      const blogRef = doc(db, BLOGS_COLLECTION, blogId);
      await updateDoc(blogRef, {
        comments: arrayUnion(newComment)
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },
};