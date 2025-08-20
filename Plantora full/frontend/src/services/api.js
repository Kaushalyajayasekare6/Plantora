const API_BASE_URL = 'http://localhost:5000/api';

// Product API functions
export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch products' }));
        throw new Error(errorData.message || 'Failed to fetch products');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      let options;
      if (productData instanceof FormData) {
        // Log FormData contents for debugging
        console.log('FormData entries:');
        for (let [key, value] of productData.entries()) {
          console.log(key, value);
        }
        
        options = {
          method: 'POST',
          body: productData, // Do not set Content-Type for FormData!
        };
      } else {
        options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        };
      }
      
      const response = await fetch(`${API_BASE_URL}/products`, options);
      
      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = 'Failed to create product';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          
          // If there are validation errors, include them
          if (errorData.errors) {
            errorMessage += ': ' + errorData.errors.join(', ');
          }
        } catch (jsonError) {
          console.error('Error parsing error response:', jsonError);
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (productId, productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update product' }));
        throw new Error(errorData.message || 'Failed to update product');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to delete product' }));
        throw new Error(errorData.message || 'Failed to delete product');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

// User API functions
export const userAPI = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch users' }));
        throw new Error(errorData.message || 'Failed to fetch users');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Signup user
  signupUser: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }
      return data;
    } catch (error) {
      console.error('Error signing up user:', error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to delete user' }));
        throw new Error(errorData.message || 'Failed to delete user');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Update user role
  updateUserRole: async (userId, roleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update user role' }));
        throw new Error(errorData.message || 'Failed to update user role');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  },
};