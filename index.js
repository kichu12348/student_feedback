document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');
    const heroBtn = document.getElementById('hero-btn');

    heroBtn.addEventListener('click', function() {
        document.querySelector('nav a[href="#feedback"]').click();
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.querySelector(targetId).classList.add('active');
        });
    });
    
    const stars = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('rating');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingInput.value = rating;
            
            // Update star display
            stars.forEach(s => {
                const sRating = s.getAttribute('data-rating');
                s.classList.remove('fas');
                s.classList.add('far');
                
                if (sRating <= rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const rating = this.getAttribute('data-rating');
            
            stars.forEach(s => {
                const sRating = s.getAttribute('data-rating');
                if (sRating <= rating) {
                    s.classList.add('hover');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            stars.forEach(s => {
                s.classList.remove('hover');
            });
        });
    });
    
    // submit form
    const feedbackForm = document.getElementById('feedbackForm');
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const feedback = {
            id: Date.now(),
            category: document.getElementById('category').value,
            specific: document.getElementById('specific').value,
            rating: document.getElementById('rating').value,
            text: document.getElementById('feedback-text').value,
            date: new Date().toLocaleDateString()
        };
        
        saveFeedback(feedback);

        showSuccessMessage();
        
        // Reset form
        feedbackForm.reset();
        stars.forEach(s => {
            s.classList.remove('fas');
            s.classList.add('far');
        });
        ratingInput.value = '';
    });
    
    function validateForm() {
        let valid = true;
        
        if (!ratingInput.value) {
            alert('Please select a rating');
            valid = false;
        }
        
        return valid;
    }
    
    function saveFeedback(feedback) {
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        
        // If admin panel is active, refresh the display
        if (document.getElementById('admin').classList.contains('active')) {
            displayFeedbacks();
        }
    }
    
    function showSuccessMessage() {
        const formContainer = document.querySelector('.form-container');
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
            <p><i class="fas fa-check-circle" style="color: var(--accent);"></i> Feedback submitted successfully!</p>
        `;
        formContainer.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    }

    const filterCategory = document.getElementById('filter-category');
    const searchInput = document.getElementById('search');
    
    document.querySelector('nav a[href="#admin"]').addEventListener('click', function() {
        displayFeedbacks();
    });

    filterCategory.addEventListener('change', displayFeedbacks);
    searchInput.addEventListener('input', displayFeedbacks);
    
    function displayFeedbacks() {
        const feedbackContainer = document.getElementById('feedback-container');
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        const category = filterCategory.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        feedbackContainer.innerHTML = '';
        
        const filteredFeedbacks = feedbacks.filter(item => {
            const matchCategory = category === 'all' || item.category === category;
            const matchSearch = item.specific.toLowerCase().includes(searchTerm) || 
                               item.text.toLowerCase().includes(searchTerm);
            
            return matchCategory && matchSearch;
        });
        
        if (filteredFeedbacks.length === 0) {
            feedbackContainer.innerHTML = '<p>No feedback found.</p>';
            return;
        }

        filteredFeedbacks.forEach(item => {
            const feedbackCard = document.createElement('div');
            feedbackCard.className = 'feedback-card';
            feedbackCard.innerHTML = `
                <div class="header">
                    <span class="category">${item.category}: ${item.specific}</span>
                    <span class="stars">${'★'.repeat(item.rating)}</span>
                </div>
                <div class="content">
                    <p>${item.text}</p>
                </div>
                <div class="footer">
                    <small>Submitted on ${item.date}</small>
                    <button class="delete-btn" data-id="${item.id}">Delete</button>
                </div>
            `;
            feedbackContainer.appendChild(feedbackCard);
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteFeedback(id);
            });
        });
    }
    
    function deleteFeedback(id) {
        if (confirm('Are you sure you want to delete this feedback?')) {
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
            feedbacks = feedbacks.filter(item => item.id !== id);
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
            displayFeedbacks();
        }
    }
});
