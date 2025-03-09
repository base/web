import { useState } from 'react';
import { FeedbackType } from '../types.ts';

export function useFeedback() {
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [showTextbox, setShowTextbox] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFeedback = (type: FeedbackType) => {
    if (feedback === type) {
      setFeedback(null);
      setShowTextbox(false);
      setSelectedCategories([]);
    } else {
      setFeedback(type);
      setShowTextbox(true);
      setSelectedCategories([]);
    }
    setSubmitError(null);
  };

  const handleToggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async () => {
    if (!feedback) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/submitFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likeOrDislike: feedback === 'positive',
          options: selectedCategories,
          comment,
          url: window.location.href,
          ipAddress: '', // This will be set by the server
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      // Reset the form
      setFeedback(null);
      setShowTextbox(false);
      setComment('');
      setSelectedCategories([]);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    feedback,
    showTextbox,
    comment,
    selectedCategories,
    isSubmitting,
    submitError,
    setComment,
    handleFeedback,
    handleToggleCategory,
    handleSubmit
  };
}