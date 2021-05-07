
  // imports here:
  
  const removeFromShelf = async (the_shelf, the_podcast) => {
    
      const response = await fetch(`/api/shelves/${the_shelf}/podcasts/${the_podcast}`, {
          method: 'DELETE'
      });
  
      return await response.json();
  };


// // functions here:
// // gets the current users shelf data for html rendering
// const shelfData = async () => {
//     const the_response = await fetch(`/api/shelves`);
//     const data = await the_response.json();
//     return data;
// }


// sends a delete request to the api that deletes a users shelf item



//    const unicodeToChar = function(text) {
//   return text.replace(/\\u[\dA-F]{4}/gi, function(match) {
//       return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
//   });
// }

// // checks if a type has any podcasts in its array of podcasts
// const checkArray = (the_array) => {
//     if (the_array.length === 0) {
//         return 'There are no podcasts in this shelf.'
//     }
// }


// // checks if what is passed in is undefined
// const makeDecision = (checked_thing, the_array, type_div) => {
//     if (checked_thing === undefined) {
//         // if it is undefined then loop through the array and put each items content to html
//         const unordered_list = document.createElement('div');
//         unordered_list.setAttribute('class', 'shelf-contents')

//         the_array.forEach(eachItem => {
//             const item = document.createElement('div');
//             item.setAttribute('class', 'shelf-item')
//             const podPicDiv = document.createElement('div');
//             podPicDiv.setAttribute('class', 'pod-pic-div')
//             const podPic = document.createElement('a');
//             podPic.setAttribute('class', 'pod-pic')
//             const removeButtonDiv = document.createElement('div');
//             // removeButtonDiv.setAttribute('class', 'remove-button');
//             const removeButton = document.createElement('button');
//             removeButton.innerText = `Remove`;
//             removeButton.setAttribute('class', `${eachItem.PodShelf.shelfId} remove-button`);
//             removeButton.setAttribute('id', `${eachItem.PodShelf.podcastId}`);
//             const titleDiv = document.createElement('div');
//             podPicDiv.setAttribute('class', 'pod-name-div')
//             const title = document.createElement('a');
//             title.innerHTML = `<span>${eachItem.name}</span>`
//             title.href = `/podcasts/${eachItem.id}`;
//             title.setAttribute('class', 'pod-name')
//             podPic.href = `/podcasts/${eachItem.id}`;
//             podPic.innerHTML = `<img alt=${eachItem.name} src=/images/catalog/${eachItem.id}.jpeg
//                                         onError="src='/images/logo.png'">`;
//             const sideContent = document.createElement('div')
//             sideContent.setAttribute('class', 'name-and-btn')
//             podPicDiv.appendChild(podPic);
//             titleDiv.appendChild(title);
//             removeButtonDiv.appendChild(removeButton)
//             sideContent.appendChild(titleDiv);
//             sideContent.appendChild(removeButtonDiv);
//             item.appendChild(podPicDiv)
//             item.appendChild(sideContent);
//             unordered_list.appendChild(item);

//         });

//         type_div.appendChild(unordered_list)


//     } else {
//         // put the checked_thing in html
//         const message = document.createElement('p');
//         message.innerHTML = checked_thing;
//         type_div.appendChild(message);

//     }
// }




// // selectors here
// const shelfContainer = document.querySelector(".shelves");



// // DOM window listener here:
window.addEventListener("DOMContentLoaded", async (event) => {
//     const addShelfbutton = document.getElementById("newShelfBtn");
//     const rbs = document.querySelectorAll('input[name="shelf-icon"]');
//     let selectedIcon;
//     const postNewShelf = () => {
//         for (const rb of rbs) {
//             if (rb.checked) {
//                 selectedIcon = rb.value;
//                 break;
//             }
//         }

//     }
//     addShelfbutton.addEventListener("click", async (event)=> {
         
//     })

//     const result = await shelfData();
//     // console.log(result);

//     // can I wrap all of this in a function???
//     const currentDiv = document.createElement("div");
//     currentDiv.setAttribute('class', 'current-shelf')
//     const mehDiv = document.createElement("div");
//     mehDiv.setAttribute('class', 'meh-shelf')
//     const radarDiv = document.createElement("div");
//     radarDiv.setAttribute('class', 'radar-shelf')
//     const thumbsDownDiv = document.createElement("div");
//     thumbsDownDiv.setAttribute('class', 'thumbs-down-shelf')
//     const thumbsUpDiv = document.createElement("div");
//     thumbsUpDiv.setAttribute('class', 'thumbs-up-shelf')

//     // need to give each of the above divs an class and an id


//     // the types here:
//     const current_type = result.current_shelf.type;
//     const meh_type = result.meh.type;
//     const radar_type = result.radar.type;
//     const thumbs_down_type = result.thumbs_down.type;
//     const thumbs_up_type = result.thumbs_up.type;


//     const currentHead = document.createElement('h2')
//     currentHead.innerHTML = current_type;
//     currentDiv.appendChild(currentHead);
//     const mehHead = document.createElement('h2')
//     mehHead.innerHTML = meh_type;
//     mehDiv.appendChild(mehHead);
//     const radarHead = document.createElement('h2')
//     radarHead.innerHTML = radar_type;
//     radarDiv.appendChild(radarHead);
//     const thumbsDownHead = document.createElement('h2')
//     thumbsDownHead.innerHTML = thumbs_down_type;
//     thumbsDownDiv.appendChild(thumbsDownHead);
//     const thumbsUpHead = document.createElement('h2')
//     thumbsUpHead.innerHTML = thumbs_up_type;
//     thumbsUpDiv.appendChild(thumbsUpHead);


//     // all of the Podcasts arrays here:
//     const current_podcasts_array = result.current_shelf.Podcasts;
//     const meh_podcasts_array = result.meh.Podcasts;
//     const radar_podcasts_array = result.radar.Podcasts;
//     const downThumb_podcasts_array = result.thumbs_down.Podcasts;
//     const upThumb_podcasts_array = result.thumbs_up.Podcasts;


//     // all of the checks here
//     let current_result = checkArray(current_podcasts_array);
//     let meh_result = checkArray(meh_podcasts_array);
//     let radar_result = checkArray(radar_podcasts_array);
//     let downThumb_result = checkArray(downThumb_podcasts_array);
//     let upThumb_result = checkArray(upThumb_podcasts_array);

//     // pass results to makeDecision to return the nessasary info
//     makeDecision(current_result, current_podcasts_array, currentDiv);
//     makeDecision(meh_result, meh_podcasts_array, mehDiv);
//     makeDecision(radar_result, radar_podcasts_array, radarDiv);
//     makeDecision(downThumb_result, downThumb_podcasts_array, thumbsDownDiv);
//     makeDecision(upThumb_result, upThumb_podcasts_array, thumbsUpDiv);


//     shelfContainer.appendChild(currentDiv);
//     shelfContainer.appendChild(mehDiv);
//     shelfContainer.appendChild(radarDiv);
//     shelfContainer.appendChild(thumbsDownDiv);
//     shelfContainer.appendChild(thumbsUpDiv);

const shelfButtons = document.querySelectorAll(".shelf-icon")
    shelfButtons.forEach(shelfButton => {
      let span = shelfButton.childNodes[0]
      let spanInnerText = shelfButton.childNodes[0].id
      span.innerHTML = spanInnerText
    })
    const messageDiv = document.getElementsByClassName("message")
    

    // select all of the delete shelf buttons
    const deleteShelvesButtons = document.getElementsByClassName("delete-shelf")
    // add event listener
    for(let i=0; i<deleteShelvesButtons.length; i++) {
      let deleteShelf = deleteShelvesButtons[i]
      deleteShelf.addEventListener("click", async (event) => {
        
        // event.preventDefault()
        
        const shelfTitle = deleteShelf.title
        const shelfId = deleteShelf.id
        
      
        
        const types = ['Current', 'Thumbs Up', 'On My Radar', 'Meh', 'Thumbs Down'];
        
        //check if its a default shelf
        if(types.includes(shelfTitle)){
            messageDiv[i].innerHTML = "<span>You can't delete a default shelf</span>";
        }else{
          const data = await fetch(`/api/shelves/${shelfId}`, {
            method: "POST"
          })
          // console.log(data)
          if (data.ok){
            
            messageDiv[i].innerHTML = "Shelf was deleted"
            setTimeout(()=> {
              window.location.reload();
          }, 1000);
          }
          else{
            messageDiv.innerHTML= "something went wrong"
          }
        }
      })
    }
//     // select all of the remove buttons
    const RemoveButtons = document.getElementsByClassName('remove-button');

    // add click listeners to each button
    for(let i = 0; i<RemoveButtons.length; i++){
      let eachButton = RemoveButtons[i]
        eachButton.addEventListener('click', async (event) => {
          event.preventDefault()
          
            const the_shelf = eachButton.classList[0];
            const the_podcast = eachButton.id;
            
            const data = await removeFromShelf(the_shelf, the_podcast);
            const messageDiv = document.querySelector('.message');
            messageDiv.innerHTML = data.message;

            setTimeout(()=> {
                window.location.reload();
            }, 1000);

        });
      }
    })


//  });
