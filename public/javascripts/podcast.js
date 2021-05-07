window.addEventListener('DOMContentLoaded', () => {
  const reviewArea = document.getElementById('ReviewDiv')


  const popReviews = async (podcastId) => {
    const res = await fetch(`/api/podcasts/${podcastId}/reviews`)
    const json = await res.json()
    // console.log(json)

    if (res.ok) {
      json.forEach(review => {

        let newReview = document.createElement("div")
        newReview.setAttribute('class', `user-${review.userId}`);
        newReview.setAttribute('id', `review-${review.id}`)

        let userName = document.createElement('p');
        userName.setAttribute('class', `reviewer user-${review.userId} pod-${review.podcastId}`)
        userName.innerHTML = review.name;

        let reviewText = document.createElement("p")
        reviewText.setAttribute('class', `review-text user-${review.userId} pod-${review.podcastId}`);

        let ratingtext = document.createElement('p')
        ratingtext.innerHTML = "Rating: "
        let rating = document.createElement('span')
        rating.setAttribute('class', `rating user-${review.userId} pod-${review.podcastId}`);
        rating.innerHTML = '';
        for (let i = 0; i < review.rating; i++) {
          rating.innerHTML += '&#9733; ';
        }
        ratingtext.appendChild(rating)
        // console.log('review.userId: ', review.userId);
        reviewText.innerHTML = review.reviewText;
        newReview.appendChild(userName);
        newReview.appendChild(ratingtext);
        newReview.appendChild(reviewText);

        const currentUserId = document.querySelector('.userId').id;
        if(Number(currentUserId) === Number(review.userId)){

          let deleteButton = document.createElement('button');
          deleteButton.setAttribute('class', `delete-button`);
          deleteButton.setAttribute('id', `${review.id}`)
          deleteButton.innerText = 'Delete Review'
          newReview.appendChild(deleteButton);

        }

        reviewArea.appendChild(newReview);
      })
    }
    else {
      throw new Error('Unable to populate reviews at this time.')
    }
  }


  const podcastId = document.querySelector('.idgrabber').id;
  popReviews(podcastId)




  //delete a single review
  async function deleteReview(reviewId) {
    const res = await fetch(`/api/podcasts/${podcastId}/reviews/${reviewId}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      const review = document.getElementById(`review-${reviewId}`)
      review.innerHTML = '';
    } else {
      throw new Error('Unable to delete review at this time.')
    }
  }

  reviewArea.addEventListener('click', e => {
    if (e.target.className === 'delete-button') {
      const currentUserId = document.querySelector('.userId').id;
      
      const review = document.getElementById(`review-${e.target.id}`);
      if (review.className === `user-${currentUserId}`) {
        deleteReview(e.target.id)
      } else {
        let msg = document.createElement('p');
        msg.innerText = 'You are not allowed to delete this review.'
        reviewArea.appendChild(msg);
      }
    }
  })


  const getTheAverageRating = async () => {

    let rating = document.querySelectorAll(".avgRating")[0]
    const id = rating.id.split("-")[1]
    const res = await fetch(`/api/podcasts/${id}`)
    if (res.ok) {
      const resJson = await res.json()
      const averageRating = resJson.averageScore
      if (!averageRating) {
        rating.innerHTML = 'This podcast has no current ratings'
      }
      else {
        let stars = ''
        for (let i = 0; i < averageRating; i++) {
          stars += '&#9733; '
        }
        rating.innerHTML = `Average Rating <span class='Avg_Stars'>${stars}`
      }
    }

  }

  getTheAverageRating()
  const podcastName = document.getElementById("innerHeader").className
  
    const shelfButtons = document.getElementsByClassName("shelf_btn")
    
    for(let i = 0; i < shelfButtons.length; i++) {
      let shelfButton = shelfButtons[i]
      let span = shelfButton.childNodes[0]
      let spanInnerText = shelfButton.childNodes[0].id
      span.innerHTML = spanInnerText
      shelfButton.addEventListener("click", async (event) => {
        
        let shelfId = shelfButton.id
        let shelfTitle = shelfButton.title
        const podcastId = shelfButton.parentElement.id;
       const res = await fetch("/api/shelves", {
          method: "POST",
          credentials: 'same-origin',
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({"podcastId": podcastId, "ShelfId": shelfId,"shelfTitle":shelfTitle, "podcastName":podcastName})

        });

        const data = await res.json();
        const messageDiv = document.getElementsByClassName("message")[0];
        messageDiv.innerHTML = data.message;

      });

    };
    
    const hideDescriptionBtns = document.querySelectorAll('.hideDescription')
    const descriptionDivs = document.querySelectorAll('.descriptionDiv')
    const descriptionBtns = document.querySelectorAll('.descriptionBtn')

    descriptionBtns.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        descriptionDivs[i].classList.remove('hidden')
        // btn.classList.add('hidden')
        // hideDescriptionBtns[i].classList.remove('hidden')
      })
    })
    
    hideDescriptionBtns.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        descriptionDivs[i].classList.add('hidden')
        btn.classList.add('hidden')
        descriptionBtns[i].classList.remove('hidden')
      })
    })
    
    const hidePlayerBtns = document.querySelectorAll('.hidePlayer')
    const playerBtns = document.querySelectorAll('.playerBtn')
    const players = document.querySelectorAll('.player')


    playerBtns.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        players[i].classList.remove('hidden')
        btn.classList.add('hidden')
        hidePlayerBtns[i].classList.remove('hidden')
      })

    })

    hidePlayerBtns.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        players[i].classList.add('hidden')
        playerBtns[i].classList.remove('hidden')
        btn.classList.add('hidden')
      })
    })
  });