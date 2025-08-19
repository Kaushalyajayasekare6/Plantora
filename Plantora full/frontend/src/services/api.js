const API_BASE_URL = 'http://localhost:5000/api';

// Product API functions
export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // Create new product
  createProduct: async (productData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  },

  // Update product
  updateProduct: async (productId, productData) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  },

  // Delete product
  deleteProduct: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return response.json();
  },
};

// User API functions
export const userAPI = {
  // Get all users
  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return response.json();
  },

  // Update user role
  updateUserRole: async (userId, roleData) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleData),
    });
    if (!response.ok) {
      throw new Error('Failed to update user role');
    }
    return response.json();
  },
};
