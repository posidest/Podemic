const express = require('express');
const unirest = require("unirest")
const router = express.Router();
const { User, Podcast, Genre, Shelf } = require("../db/models")
const { csrf, csrfProtection, bcrypt, check, validationResult, asyncHandler, createShelves } = require("../lib/util")
const { loginUser, logoutUser } = require("../auth")
const apiKey = process.env.LISTEN_API_KEY
const baseUrl = 'https://listen-api-test.listennotes.com/api/v2'
// for the home page



router.get('/', csrfProtection, (req, res) => {
  
  res.render('index', { csrfToken: req.csrfToken() })
});


// for the pod feed page
 router.get('/feed', asyncHandler( async (req, res) => {
  let thumbsupId = req.session.auth.userShelves['Thumbs Up'];
  let thumbsUpShelf = await Shelf.findByPk(thumbsupId)
  thumbsUpShelf = thumbsUpShelf.podcasts
  
  let randIndex = Math.floor(Math.random() * thumbsUpShelf.length);
  
  const genre_info = await unirest.get(`${baseUrl}/genres?top_level_only=1`)
  .header('X-ListenAPI-Key', apiKey)
    genre_info.toJSON();
    const genres = genre_info.body.genres;
   
    // for (let i = 0; i< genreobjlist.length; i++){
    //   let genreId = genreobjlist[i].id
    //   let genreName = genreobjlist[i].name
    //   let podcasts = await unirest.get(`${baseUrl}/best_podcasts?genre_id=${genreId}&page=2&region=us&safe_mode=0`).header('X-ListenAPI-Key',apiKey)
    //   podcasts = await podcasts.toJSON()
    //   let genrePods = {genre: genreName, podcasts: podcasts.body.podcasts}
    //   genres.push(genrePods)
    // }'https://listen-api.listennotes.com/api/v2/podcasts/25212ac3c53240a880dd5032e547047b/recommendations?safe_mode=0'
    const featuredRes = await unirest.get(`${baseUrl}/podcasts/${thumbsUpShelf[randIndex]}/recommendations?safe_mode=0`)
  .header('X-ListenAPI-Key', apiKey)
  let resJson = await featuredRes.toJSON();
 let featuredPods = [];
  if(resJson.recommendations){

    featuredPods= resJson.recommendations
  }
      featuredPods = [
          {
            "id": "19545a5b82bf42d3ba40d973c35e9851",
            "link": "https://wondery.com/shows/real-crime-profile/?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website",
            "audio": "https://www.listennotes.com/e/p/19545a5b82bf42d3ba40d973c35e9851/",
            "image": "https://cdn-images-1.listennotes.com/podcasts/real-crime-profile-real-crime-profile-wondery-SqktZ-IhT1O.1400x1400.jpg",
            "title": "American Murder: The Family Next Door, Part 7",
            "podcast": {
              "id": "51b01ebcde5f4471826c94c4d39dedc8",
              "image": "https://cdn-images-1.listennotes.com/podcasts/real-crime-profile-real-crime-profile-wondery-SqktZ-IhT1O.1400x1400.jpg",
              "title": "Real Crime Profile",
              "publisher": "Real Crime Profile / Wondery",
              "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/real-crime-profile-real-crime-profile-wondery-SqktZ-IhT1O.300x300.jpg",
              "listen_score": 77,
              "listennotes_url": "https://www.listennotes.com/c/51b01ebcde5f4471826c94c4d39dedc8/",
              "listen_score_global_rank": "0.01%"
            },
            "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/real-crime-profile-real-crime-profile-wondery-SqktZ-IhT1O.300x300.jpg",
            "description": "<p>RCP continues analyzing the murder of Shanann Watts and her children at the hands of Chris Watts. In today’s episode, Jim and Laura review Chris Watts’ behavior by using the psychopathy checklist. </p><p><br></p><p>#HernamewasShanann</p><p>#HernamewasBella</p><p>#hernamewasCeleste</p><p>#hisnamewasniko</p><p>#victimsmatter</p><p>#netflix</p><p>#amercianmurder</p><p>#thefamilynextdoor</p><p>#watts</p><p>#psychopath</p><p><br></p><p><strong>We are so grateful to our sponsors who make our show possible this week. Please check out their special offers for RCP listeners.</strong></p><p><strong>BEST FIENDS</strong></p><p><strong>This 5-star rated mobile puzzle game is a must-play and impossible to put down. Download Best Fiends FREE on Apple App Store or Google Play. That’s Friends without the “R”, Best Fiends.</strong></p><p><a href=\"http://www.bestfiends.com/\" rel=\"noopener noreferrer\" target=\"_blank\">www.bestfiends.com</a></p><p><strong>HELLO FRESH</strong></p><p><strong>Get fresh, pre-measured ingredients and mouthwatering seasonal recipes delivered right to your door with HelloFresh, American’s #1 meal kit. HelloFresh lets you skip those trips to the grocery store and makes home cooking easy, fun and affordable.</strong></p><p><strong>Go to </strong><a href=\"http://www.hellofresh.com/REALCRIME90\" rel=\"noopener noreferrer\" target=\"_blank\">HelloFresh.com/REALCRIME90</a> and use code REALCRIME to get $90 off including free shipping!</p><p><strong>FIGHT CAMP</strong></p><p><strong>FightCamp offers flexible financing for as low as zero percent APR and zero dollars down! And right now as a limited time holiday offer, get free shipping and a gift valued up to $109 with every FightCamp package. Just go to </strong><a href=\"http://www.joinfightcamp.com/REALCRIME\" rel=\"noopener noreferrer\" target=\"_blank\">JoinFightCamp.com/REALCRIME</a>. That’s right. Get free shipping and a gift valued up to $109 with your purchase. Bring an authentic boxing and kickboxing gym into your home with FightCamp. To get your FREE gift, just go to <a href=\"http://www.joinfightcamp.com/REALCRIME\" rel=\"noopener noreferrer\" target=\"_blank\">JoinFightCamp.com/REALCRIME</a>.</p><p><a href=\"http://www.joinfightcamp.com/REALCRIME\" rel=\"noopener noreferrer\" target=\"_blank\">JoinFightCamp.com/REALCRIME</a></p><p><strong>PENDULUM</strong></p><p><strong>Pendulum Glucose Control is a safe and natural medical probiotic, clinically proven to lower A1C and blood glucose spikes, and is designed for the dietary management of type 2 Diabetes. Get 25% off your first bottle now: go to </strong><a href=\"http://www.pendulumlife.com/\" rel=\"noopener noreferrer\" target=\"_blank\">www.pendulumlife.com</a> and use PROMO CODE <strong>REALCRIME</strong>. </p><p><br></p><p><strong>PENDULUM</strong></p><p><strong>Pendulum Glucose Control is a safe and</strong></p><p><strong>natural medical probiotic, clinically proven to lower A1C</strong></p><p><strong>and blood glucose spikes, and is designed for the dietary management of type 2 Diabetes.</strong></p><p>Get 25% off your first bottle now: go to </p><p><a href=\"http://www.pendulumlife.com/\" rel=\"noopener noreferrer\" target=\"_blank\">www.pendulumlife.com</a> and use PROMO CODE REALCRIME</p><p><br></p>",
            "pub_date_ms": 1605724983008,
            "guid_from_rss": "gid://art19-episode-locator/V0/IJQM4oaJ_6e7d1ULk1HX9son3kbdhBre4JqG54oBnUk",
            "listennotes_url": "https://www.listennotes.com/e/19545a5b82bf42d3ba40d973c35e9851/",
            "audio_length_sec": 2258,
            "explicit_content": false,
            "maybe_audio_invalid": false,
            "listennotes_edit_url": "https://www.listennotes.com/e/19545a5b82bf42d3ba40d973c35e9851/#edit"
          },
          {
            "id": "0ab0f10667f14f8a8a8a7c6f0bb4f7eb",
            "link": "https://www.parcast.com/passion/?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website",
            "audio": "https://www.listennotes.com/e/p/0ab0f10667f14f8a8a8a7c6f0bb4f7eb/",
            "image": "https://cdn-images-1.listennotes.com/podcasts/crimes-of-passion-parcast-network-YIyzkXuMGvJ-CDPzLritwIR.1400x1400.jpg",
            "title": "Chris Watts Pt. 1",
            "podcast": {
              "id": "337919797e744eeda112ffe71da125a7",
              "image": "https://cdn-images-1.listennotes.com/podcasts/crimes-of-passion-parcast-network-YIyzkXuMGvJ-CDPzLritwIR.1400x1400.jpg",
              "title": "Crimes of Passion",
              "publisher": "Parcast Network",
              "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/crimes-of-passion-parcast-network-Ibsm837raiT-CDPzLritwIR.300x300.jpg",
              "listen_score": 69,
              "listennotes_url": "https://www.listennotes.com/c/337919797e744eeda112ffe71da125a7/",
              "listen_score_global_rank": "0.05%"
            },
            "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/crimes-of-passion-parcast-network-Ibsm837raiT-CDPzLritwIR.300x300.jpg",
            "description": "<p>From the moment they married in 2012, Colorado couple Chris and Shanann Watts seemed to have the picture-perfect life. In reality, an extramarital affair, financial struggles, and conflicts with extended family were tearing the couple apart, all leading to a shocking, brutal crime that would end their marriage for good.</p><p> </p><p>Learn more about your ad choices. Visit <a href=\"https://megaphone.fm/adchoices\">megaphone.fm/adchoices</a></p>",
            "pub_date_ms": 1584514860081,
            "guid_from_rss": "68403044-106e-11ea-ab5b-0b7ab04d103e",
            "listennotes_url": "https://www.listennotes.com/e/0ab0f10667f14f8a8a8a7c6f0bb4f7eb/",
            "audio_length_sec": 3106,
            "explicit_content": false,
            "maybe_audio_invalid": false,
            "listennotes_edit_url": "https://www.listennotes.com/e/0ab0f10667f14f8a8a8a7c6f0bb4f7eb/#edit"
          },
          {
            "id": "6d6cb4c3e39a4d46b4c05a9522091874",
            "link": "https://audioboom.com/posts/7743481?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website",
            "audio": "https://www.listennotes.com/e/p/6d6cb4c3e39a4d46b4c05a9522091874/",
            "image": "https://cdn-images-1.listennotes.com/podcasts/crime-weekly/1-the-watts-family-murders-NGWoejQ4xyP-Gkz_7oyI61V.1400x1400.jpg",
            "title": "1: The Watts Family Murders",
            "podcast": {
              "id": "f345a978bdb145b4aa2771f5b2ae241f",
              "image": "https://cdn-images-1.listennotes.com/podcasts/crime-weekly-derrick-levasseur-and-O6wHg0GbAZh-munflqMGa7_.1400x1400.jpg",
              "title": "Crime Weekly",
              "publisher": "Derrick Levasseur and Stephanie Harlowe",
              "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/crime-weekly-derrick-levasseur-and-RMZvayILsKU-munflqMGa7_.300x300.jpg",
              "listen_score": 61,
              "listennotes_url": "https://www.listennotes.com/c/f345a978bdb145b4aa2771f5b2ae241f/",
              "listen_score_global_rank": "0.5%"
            },
            "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/crime-weekly/1-the-watts-family-murders-Xwz736OEJPt-Gkz_7oyI61V.300x300.jpg",
            "description": "<div>It was the early morning of August 13th, 2018, when Shanann Watts approached the front door of her house in Frederick Colorado. She had just returned home from a weekend business trip in Arizona, and before that she had spent six weeks in North Carolina catching up with family and friends. As she approached the house with her suitcase it was still dark, she was three months pregnant and all she wanted to do was get inside, kiss her sleeping daughters and then get off her feet and fall asleep in the arms of her loving husband. She had no idea what was waiting for her on the other side of that door.<br><br>Website: <a href=\"http://CrimeWeeklyPodcast.com\">CrimeWeeklyPodcast.com</a><br>Instagram: @CrimeWeeklyPod<br>Twitter: @CrimeWeeklyPod<br>Facebook: @CrimeWeeklyPod</div>",
            "pub_date_ms": 1607079600000,
            "guid_from_rss": "tag:audioboom.com,2020-12-03:/posts/7743481",
            "listennotes_url": "https://www.listennotes.com/e/6d6cb4c3e39a4d46b4c05a9522091874/",
            "audio_length_sec": 4439,
            "explicit_content": false,
            "maybe_audio_invalid": false,
            "listennotes_edit_url": "https://www.listennotes.com/e/6d6cb4c3e39a4d46b4c05a9522091874/#edit"
          },
          {
            "id": "15807b2dbf464f76b19a32b29b36563f",
            "link": "https://wondery.com/shows/real-crime-profile/?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website",
            "audio": "https://www.listennotes.com/e/p/15807b2dbf464f76b19a32b29b36563f/",
            "image": "https://cdn-images-1.listennotes.com/podcasts/real-crime-profile-real-crime-profile-wondery-SqktZ-IhT1O.1400x1400.jpg",
            "title": "American Murder: The Family Next Door, Part 8",
            "podcast": {
              "id": "51b01ebcde5f4471826c94c4d39dedc8",
              "image": "https://cdn-images-1.listennotes.com/podcasts/real-crime-profile-real-crime-profile-wondery-SqktZ-IhT1O.1400x1400.jpg",
              "title": "Real Crime Profile",
              "publisher": "Real Crime Profile / Wondery",
              "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/real-crime-profile-real-crime-profile-wondery-SqktZ-IhT1O.300x300.jpg",
              "listen_score": 77,
              "listennotes_url": "https://www.listennotes.com/c/51b01ebcde5f4471826c94c4d39dedc8/",
              "listen_score_global_rank": "0.01%"
            },
            "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/real-crime-profile-real-crime-profile-wondery-SqktZ-IhT1O.300x300.jpg",
            "description": "<p>In our final episode on this case, RCP finishes analyzing the murder of Shanann Watts and her children at the hands of Chris Watts. In today’s episode, Jim and Laura finish reviewing Chris Watts’ behavior by using the psychopathy checklist. What do you think his score was?</p><p><br></p><p>#HernamewasShanann</p><p>#HernamewasBella</p><p>#hernamewasCeleste</p><p>#hisnamewasniko</p><p>#victimsmatter</p><p>#netflix</p><p>#amercianmurder</p><p>#thefamilynextdoor</p><p>#watts</p><p>#psychopath</p><p><br></p><p><br></p><p><strong>We are so grateful to our sponsors who made our show possible this week. Please check out their special offers for RCP listeners.</strong></p><p><strong>NUTRAFOL - </strong></p><p>You can grow thicker, healthier hair AND support our show by going to <a href=\"http://www.nutrafol.com/\" rel=\"noopener noreferrer\" target=\"_blank\">www.nutrafol.com</a> and using PROMO CODE: REALCRIME. New customers will get 20% off — this is their best offer anywhere. Plus FREE shipping on EVERY order. </p><p><br></p><p><strong>NUCALM - </strong></p><p>No matter what life throws at you, NuCalm will reduce your stress level. It is the only stress management system of its kind clinically proven to improve your sleep, reduce your stress and boost your recovery WITHOUT drugs and side effects. The whole process is easy to use and work into your daily routine. Go to <a href=\"http://www.realcrimenucalm.com/\" rel=\"noopener noreferrer\" target=\"_blank\">www.realcrimenucalm.com</a> and get 50% off your 30-day subscription and their money back guarantee. </p><p><br></p><p><strong>CW Channel App - </strong></p><p>Tis the season to be catching up on your favorite CW shows for FREE. StarGirl, Nancy Drew and BatWoman are just some of the shows to catch up on before the new season begins. Download the app now.</p><p><a href=\"https://www.cwtv.com/thecw/the-cw-app/\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.cwtv.com/thecw/the-cw-app/</a></p>",
            "pub_date_ms": 1606294800007,
            "guid_from_rss": "gid://art19-episode-locator/V0/AoUdx8U6BZNvcxYST5xKWc7G8YHx1W_OGXNWlHMWh-Y",
            "listennotes_url": "https://www.listennotes.com/e/15807b2dbf464f76b19a32b29b36563f/",
            "audio_length_sec": 2338,
            "explicit_content": false,
            "maybe_audio_invalid": false,
            "listennotes_edit_url": "https://www.listennotes.com/e/15807b2dbf464f76b19a32b29b36563f/#edit"
          },
          {
            "id": "8674f6e184e74588ae860467bafa3f9d",
            "link": "https://www.parcast.com/passion/?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website",
            "audio": "https://www.listennotes.com/e/p/8674f6e184e74588ae860467bafa3f9d/",
            "image": "https://cdn-images-1.listennotes.com/podcasts/crimes-of-passion-parcast-network-YIyzkXuMGvJ-CDPzLritwIR.1400x1400.jpg",
            "title": "Chris Watts Pt. 2",
            "podcast": {
              "id": "337919797e744eeda112ffe71da125a7",
              "image": "https://cdn-images-1.listennotes.com/podcasts/crimes-of-passion-parcast-network-YIyzkXuMGvJ-CDPzLritwIR.1400x1400.jpg",
              "title": "Crimes of Passion",
              "publisher": "Parcast Network",
              "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/crimes-of-passion-parcast-network-Ibsm837raiT-CDPzLritwIR.300x300.jpg",
              "listen_score": 69,
              "listennotes_url": "https://www.listennotes.com/c/337919797e744eeda112ffe71da125a7/",
              "listen_score_global_rank": "0.05%"
            },
            "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/crimes-of-passion-parcast-network-Ibsm837raiT-CDPzLritwIR.300x300.jpg",
            "description": "<p>In August of 2018, the picture perfect marriage of Chris and Shanann Watts ended in violent tragedy. The trauma left a family broken and a Colorado community reeling, as the public struggled to understand the shocking crime.</p><p> </p><p>Learn more about your ad choices. Visit <a href=\"https://megaphone.fm/adchoices\">megaphone.fm/adchoices</a></p>",
            "pub_date_ms": 1585119660079,
            "guid_from_rss": "684507ea-106e-11ea-ab5b-ef277611bcbe",
            "listennotes_url": "https://www.listennotes.com/e/8674f6e184e74588ae860467bafa3f9d/",
            "audio_length_sec": 2925,
            "explicit_content": false,
            "maybe_audio_invalid": false,
            "listennotes_edit_url": "https://www.listennotes.com/e/8674f6e184e74588ae860467bafa3f9d/#edit"
          },
          {
            "id": "224010b23f614ea887d8c8f5b4c55078",
            "link": "https://omny.fm/shows/crime-writers-on-true-crime-review/american-murder-chameleon?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website",
            "audio": "https://www.listennotes.com/e/p/224010b23f614ea887d8c8f5b4c55078/",
            "image": "https://cdn-images-1.listennotes.com/podcasts/crime-writers/american-murder-the-family-MI9HzoRWpVG-p1YQE-n2N4t.1400x1400.jpg",
            "title": "American Murder: The Family Next Door & Chameleon",
            "podcast": {
              "id": "742e13b3d1344f6fb2e55ed8ddccd651",
              "image": "https://cdn-images-1.listennotes.com/podcasts/crime-writers-ontrue-crime-review-partners-_0GbigoIEQT-j54cdk7JsI2.1400x1400.jpg",
              "title": "Crime Writers On...True Crime Review",
              "publisher": "Partners in Crime Media",
              "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/crime-writers-ontrue-crime-review-partners-aju6z9KV8ov-j54cdk7JsI2.300x300.jpg",
              "listen_score": 69,
              "listennotes_url": "https://www.listennotes.com/c/742e13b3d1344f6fb2e55ed8ddccd651/",
              "listen_score_global_rank": "0.05%"
            },
            "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/crime-writers/american-murder-the-family-riYvednmPkZ-p1YQE-n2N4t.300x300.jpg",
            "description": "<p>It was a scam that tricked film crew members to fly halfway around the world for a fake movie. But what was this con job <em>really</em> about? We’ll talk about the new podcast, \"<a href=\"https://podcasts.apple.com/us/podcast/chameleon-hollywood-con-queen/id1532225667\">Chameleon: The Hollywood Con Queen</a>.\"</p>\n<p>FOR OUR SPOILER-FREE REVIEW OF \"CHAMELEON\" GO TO 24:00</p>\n<p>Netflix’s new documentary “<a href=\"https://www.netflix.com/title/81130130\">American Murder: The Family Next Door</a>” is told exclusively through texts, Facebook posts, police body cams and surveillance video. What results is an inside look at Shanann Watts family’s slow roll to tragedy that is compelling, voyeuristic, and indisputably unique. </p>\n<p>FOR OUR SPOILER-FREE REVIEW OF \"AMERICAN MURDER\" GO TO 56:00</p>\n<p>In Crime of the Week: <a href=\"https://oklahoman.com/article/5673248/baby-shark-kids-song-used-to-bully-jail-inmates-da-says\">shark bit</a>.</p>\n<p><a href=\"https://www.facebook.com/watch/crimewritersonpodcast\">VIEW THIS PODCAST EPISODE ON FACEBOOK WATCH</a>! </p><p><a href=\"https://patreon.com/partnersincrimemedia\" rel=\"payment\">For exclusive content and more, sign up on Patreon.: https://patreon.com/partnersincrimemedia</a></p><p>See <a href=\"https://omnystudio.com/listener\">omnystudio.com/listener</a> for privacy information.</p>",
            "pub_date_ms": 1602489600016,
            "guid_from_rss": "d67ff9b2-76d7-4fdb-b958-ac4f010e916e",
            "listennotes_url": "https://www.listennotes.com/e/224010b23f614ea887d8c8f5b4c55078/",
            "audio_length_sec": 3798,
            "explicit_content": true,
            "maybe_audio_invalid": false,
            "listennotes_edit_url": "https://www.listennotes.com/e/224010b23f614ea887d8c8f5b4c55078/#edit"
          },
          {
            "id": "c513b25a73814be88306ff24e90deb3a",
            "link": "https://stownpodcast.org/chapter/1?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website",
            "audio": "https://www.listennotes.com/e/p/c513b25a73814be88306ff24e90deb3a/",
            "image": "https://cdn-images-1.listennotes.com/podcasts/s-town-serial-this-american-life-W_9uhVgNtUv-Y0lowXcvfOh.1400x1400.jpg",
            "title": "Chapter I",
            "podcast": {
              "id": "e13247ed5bd04a04bf55ea4e5f4c958d",
              "image": "https://cdn-images-1.listennotes.com/podcasts/s-town-serial-this-american-life-W_9uhVgNtUv-Y0lowXcvfOh.1400x1400.jpg",
              "title": "S-Town",
              "publisher": "Serial & This American Life",
              "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/s-town-serial-this-american-life-k8WPsQbYKDn-Y0lowXcvfOh.300x300.jpg",
              "listen_score": 87,
              "listennotes_url": "https://www.listennotes.com/c/e13247ed5bd04a04bf55ea4e5f4c958d/",
              "listen_score_global_rank": "0.01%"
            },
            "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/s-town-serial-this-american-life-k8WPsQbYKDn-Y0lowXcvfOh.300x300.jpg",
            "description": "<p>“If you keep your mouth shut, you’ll be surprised what you can learn.”</p>",
            "pub_date_ms": 1490695200000,
            "guid_from_rss": "e01",
            "listennotes_url": "https://www.listennotes.com/e/c513b25a73814be88306ff24e90deb3a/",
            "audio_length_sec": 3082,
            "explicit_content": true,
            "maybe_audio_invalid": false,
            "listennotes_edit_url": "https://www.listennotes.com/e/c513b25a73814be88306ff24e90deb3a/#edit"
          },
          {
            "id": "729faf98658342fc82917b768d69aff3",
            "link": "http://redhead.io/podcasts/sample-rss-feed/episode-07?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website",
            "audio": "https://www.listennotes.com/e/p/729faf98658342fc82917b768d69aff3/",
            "image": "https://cdn-images-1.listennotes.com/podcasts/fpo-serial-one-season-redheadio-3AuKlaO0R2d.1400x1400.jpg",
            "title": "S01 EP7: Only Item Description with CDATA",
            "podcast": {
              "id": "d0a23be0136f427fa7ee00981e118c47",
              "image": "https://cdn-images-1.listennotes.com/podcasts/fpo-serial-one-season-redheadio-3AuKlaO0R2d.1400x1400.jpg",
              "title": "FPO: Serial, One Season",
              "publisher": "redhead.io",
              "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/fpo-serial-one-season-redheadio-3AuKlaO0R2d.300x300.jpg",
              "listen_score": 30,
              "listennotes_url": "https://www.listennotes.com/c/d0a23be0136f427fa7ee00981e118c47/",
              "listen_score_global_rank": "10%"
            },
            "thumbnail": "https://cdn-images-1.listennotes.com/podcasts/fpo-serial-one-season-redheadio-3AuKlaO0R2d.300x300.jpg",
            "description": "Item Content Encoded\n                <p><a href=\"http://redhead.io\">redhead.io</a></p>\n                <p><i>Italic</i>, <em>Emphasis</em></p>\n                <p><b>Bold</b>, <strong>Strong</strong></p>\n                <ol>\n                    <li>Ordered List Item 1</li>\n                    <li>Ordered List Item 2</li>\n                    <li>Ordered List Item 3</li>\n                </ol>\n                <ul>\n                    <li>Unordered List Item</li>\n                    <li>Unordered List Item</li>\n                    <li>Unordered List Item</li>\n                </ul>\n                <p>A long paragraph of text which doesn't have any line breaks but eventually I'll put a br tag in here somewhere. How about<br/>Here.</p>\n                (cdata)",
            "pub_date_ms": 1496841300000,
            "guid_from_rss": "3c94d036-6d80-4350-99fc-d0ef2a8cb50d",
            "listennotes_url": "https://www.listennotes.com/e/729faf98658342fc82917b768d69aff3/",
            "audio_length_sec": 180,
            "explicit_content": false,
            "maybe_audio_invalid": false,
            "listennotes_edit_url": "https://www.listennotes.com/e/729faf98658342fc82917b768d69aff3/#edit"
          }
        ]

      
      //featuredPods was undefined...for now i am sending all the featured pods as recommended


      // await console.log(featuredPods, 'featuredPods')
        res.render('feed', {genre_info: genres, featuredPods})
    
        //  res.render('feed', {genres, recommended})
      // }}
    

  }));

  // router.get('/me', asyncHandler( async (req, res) => {
  
  //    const user_id = req.session.auth.userId;
    
  //   const users_shelf = await Shelf.findAll({
  //       where: { userId: user_id }
  //   });
    
  //   let result = []
    
    
  //   for (let shelf in users_shelf){
  //       let currentShelf = {title:shelf.title}
  //       let newPodsArray = []
  //       for (let pod in shelf.podcasts){
  //           let podcast = await unirest.get(`https://listen-api.listennotes.com/api/v2/podcasts/${pod}?next_episode_pub_date=1479154463000&sort=recent_first`)
  //           .header('X-ListenAPI-Key', apiKey)
  //         podcast = await podcast.toJSON();
  //         podcast = podcast.body
  //           newPodsArray.push(podcast)
  //       }
  //       currentShelf.podcasts=newPodsArray
  //       result.push(currentShelf)
  //   }
   
  //   console.log(result)
  //   res.render("profile", {shelves:result});
  // }));



module.exports = router;
