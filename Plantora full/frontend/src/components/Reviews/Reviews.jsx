import React, { useState } from 'react';
import styles from './Reviews.module.css';

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Ane',
      content: 'Grotel: I really love this!',
      rating: 5,
      timestamp: '2 days ago',
      likes: 1,
      replies: [],
      isLiked: false
    }
  ]);
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim() && rating > 0) {
      const newReview = {
        id: Date.now(),
        author: 'You',
        content: review,
        rating,
        timestamp: 'Just now',
        likes: 0,
        replies: [],
        isLiked: false
      };
      setReviews([...reviews, newReview]);
      setRating(0);
      setReview('');
    }
  };

  const handleLike = (id) => {
    setReviews(reviews.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          isLiked: !item.isLiked
        };
      }
      return item;
    }));
  };

  const handleReplySubmit = (e, reviewId) => {
    e.preventDefault();
    if (replyText.trim()) {
      setReviews(reviews.map(item => {
        if (item.id === reviewId) {
          return {
            ...item,
            replies: [
              ...item.replies,
              {
                id: Date.now(),
                author: 'You',
                content: replyText,
                timestamp: 'Just now'
              }
            ]
          };
        }
        return item;
      }));
      setReplyText('');
      setReplyingTo(null);
    }
  };

  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.sectionTitle}>Customer Feedback</h2>

      {reviews.map((reviewItem) => (
        <div key={reviewItem.id} className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <span className={styles.author}>{reviewItem.author}</span>
            <span className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`${styles.star} ${i < reviewItem.rating ? styles.filled : ''}`}>★</span>
              ))}
            </span>
            <span className={styles.timestamp}>{reviewItem.timestamp}</span>
          </div>

          <p className={styles.reviewText}>{reviewItem.content}</p>

          <div className={styles.actions}>
            <button 
              className={`${styles.actionButton} ${reviewItem.isLiked ? styles.liked : ''}`}
              onClick={() => handleLike(reviewItem.id)}
            >
              👍 Like ({reviewItem.likes})
            </button>

            <button 
              className={styles.actionButton}
              onClick={() => setReplyingTo(replyingTo === reviewItem.id ? null : reviewItem.id)}
            >
              💬 Reply
            </button>
          </div>

          {replyingTo === reviewItem.id && (
            <form 
              onSubmit={(e) => handleReplySubmit(e, reviewItem.id)}
              className={styles.replyForm}
            >
              <textarea
                placeholder="Write your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className={styles.replyTextarea}
              />
              <div className={styles.replyButtons}>
                <button type="submit" className={styles.submitReply}>Submit</button>
                <button 
                  type="button" 
                  className={styles.cancelReply}
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {reviewItem.replies.length > 0 && (
            <div className={styles.repliesContainer}>
              {reviewItem.replies.map((reply) => (
                <div key={reply.id} className={styles.replyCard}>
                  <div className={styles.replyHeader}>
                    <span className={styles.replyAuthor}>{reply.author}</span>
                    <span className={styles.replyTimestamp}>{reply.timestamp}</span>
                  </div>
                  <p className={styles.replyText}>{reply.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <h3 className={styles.formTitle}>Write a Review</h3>

        <div className={styles.formGroup}>
          <label className={styles.label}>Rating</label>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star}
                className={`${styles.star} ${star <= rating ? styles.filled : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Your Review</label>
          <textarea
            placeholder="Write your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>Submit Review</button>
      </form>
    </div>
  );
};

export default Reviews;
