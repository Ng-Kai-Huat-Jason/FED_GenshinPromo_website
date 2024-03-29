# GenshinPromo
GenshinPromo is a collaborative work between MiHoYo and our company to promote official "Genshin Impact" branded merchandise as well as the "Genshin Impact" videogame to potential returning players and new players.<br/>
Link to Website Here: [GenshinPromo](https://ng-kai-huat-jason.github.io/FED_GenshinPromo_website/)
 
## Design Process
This website is designed to provide the playerbase a seamless and efficient method to purchase "Genshin Impact" merchandise, whilst boosting customer engagement with short quizzes that provide complimentary discounts to the merchandise shop.


## Company Objectives:

From the company's standpoint, our primary objectives are to foster user trust and satisfaction through a commitment to:

- Ensure top-notch product quality.
- Deliver excellent customer support.
- Provide a continuous stream of the latest products and exclusive deals for our loyal customers.

## User Experience Goals:

From a user's standpoint, we aim to create an enjoyable experience by:

- Ensuring a seamless and intuitive website navigation.
- Facilitating easy access channels to high-quality products.
- Offering convenient and concise communication channels with our company.
- Catering to specific interests, such as providing accessible links to Genshin-related content, including the game and its official platforms.


## Features
- Feature 1: Provides players with a trailer of latest upcoming event for "Genshin Impact" and showcases the featured in-game characters.
- Feature 2: Provides players with hyperlinks to "Genshin Impact" social media platforms in the footer.
- Feature 3: Event details page to showcase upcoming in-game events.
- Feature 4: Product page to allow logged in users to order "Genshin Impact" products which will be send to a database after checkout.
- Feature 5: Users are able to create and log in to the page, thus able to access a checkout feature in the Product Page and the Free Reward Page.
- Feature 6: Free Reward Page contains a quiz which provides a discount to logged in users after completion.
- Feature 7: Users are initiated at Bronze tier upon account creation and can advance to Silver after 5 checkouts or Gold after 10 checkouts in total. Silver tier offers a $5 discount, while Gold tier provides a $10 discount.

## Wireframe & Video Link & Repo Link
- [Wireframe Link](https://xd.adobe.com/view/fa41b681-5a3d-4264-8ca2-7ee068395d03-af12/)
- [Video Demo](https://drive.google.com/file/d/1wCEsWRCG7IbrVyfCfRt2HEUQlJSkP1z4/view?usp=drive_link)
- [Github Repositry](https://github.com/Ng-Kai-Huat-Jason/FED_GenshinPromo_website.git)

## Technologies Used
- [Visual Studio Code Software](https://code.visualstudio.com/)
    - This project uses VScode it's a IDE.
- [HTML](https://en.wikipedia.org/wiki/HTML)
    - This project uses HTML to code the website.
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript#:~:text=JavaScript%20(JS)%20is%20a%20lightweight,Apache%20CouchDB%20and%20Adobe%20Acrobat.)
    - This project uses Javascript to code the functionality of the website such as the product page and added of animations.
- [CSS](https://en.wikipedia.org/wiki/CSS)
    - This project uses CSS to style the website aesthetics.
- [RestDB](https://restdb.io/)
    - This project uses RestDB.io database to store information for accounts, its respective tier and the product system.
- [AdobeXD](https://adobexdplatform.com/)
    - This project uses AdobeXD for it's wireframe.

## WorkFlow
    As this project is done by multiple individuals, branches are incorporated to serve as compartmentalisation of work. Therefore as much as possible, no direct commits to main are allowed.
    This serves as a failsafe measure and filter to prevent and catch errors before merging into main, thus adding a layer of security to our work. It additional serves to track and maintain accountability for all code committed.\

    For any changes to the code it will follow this structure:
    1. Commit changes to branch
    2. Merge branch with main after approval through pull request

    Before any changes are made to the code, one should update their branch to the latest version from main by:
    1. Merge main with branch through pull request
    2. Continue to make commits to branch only

## Testing
   DISCLAIMER: Pages require adequate time to load its functions or capabilities<br/>
   Note: If you recieve a cors error in the console log, this is due to the database reaching its fetch limit as there are restrictions for the free RestDB account <br/>
   TEST ACCOUNT email is test@gmail.com and password is 111 or testers can make their own.
    
    Navigation Testing
    -----------------------------------
    1. Make sure navigation and footer links work on all pages and in mobile view.
    2. Make sure Product Page and Free Reward Page only allow "Logged In" players to use the functions. ( Can't check out and Quiz is disabled )
    
    Account Page Testing
    -----------------------------------
    1. Test Account Creation, Make sure it detects empty fields , existing emails or missing @ sign for email. If it succeed in creating , check Account Collection and Tiersystem Collection for new data.
    2. Check for Unique Email , test this by creating an account with test@gmail.com (already exists in the database) , it will alert the user via a window alert.
    3. For Logging In , Make sure players can only log in with existing emails and its correct password. After logging in, players will directed to the Home Page

    Home Page Testing
    -----------------------------------
    1. When Home Page opens, Lottie Animation plays
    2. Make sure Event Carousel works and the buttons lead to the correct sections of the Event Details.
    3. For Character Showcase , Make sure the abilities name change the video to their respective skills.
    4. For Mobile View , Carousel will work but buttons will be removed.
    
    Event Details Page Testing
    -----------------------------------
    1. Make sure videos work.
    2. For Mobile View , All Infoboxes will shift to column view for easier viewing.
    
    Product Page Testing
    -----------------------------------
    1. If Tester is not logged in , Account name will be set to Guest and Have No Tier. If not , the Account Name will be the name of the account and their tier
    2. Make sure if it's Guest Account , Add to Cart and Check Out Button doesn't work.
    3. When Logged In , Add to Cart Button works and if there are items in the cart and User checks out, Window alert will be send and the Order collection and Tiersystem collection will be updated.
    4. If User has done the Quiz or is Silver or Gold make sure discount is applied ( can be tested via forcefully changing the tier in the database ) .
    5. If User has not done Quiz and is logged in , the alert will ask the to do for a discount. 
    6. Tier system works via the total checkout counter in the Tiersystem collection in the database.

    Free Reward Page Testing (Quiz)
    -----------------------------------
    1. If User is not logged in , Quiz is disabled and alert will be shown.
    2. If User is logged in , Quiz will be enable and questions will be shown.
    3. After Quiz Completion , Quiz is disabled.


## Credits
All rights belong to their respecitve owners, all events stipulated in the website are fictional and have no association with the actual Genshin Impact game created by Mihoyo.

### Media
- Lottie Animation Inspired from Genshin made by [Ng Kai Huat Jason](https://drive.google.com/drive/folders/1RM59c7QCcgw8IQ_r_XPIYJ7fr7lUE8Bt?usp=sharing)
- The pictures of the products is taken from [Amazon SG](https://www.amazon.sg/ref=nav_logo)
- The "Genshin Impact " Logo is taken from [CityPNG](https://www.citypng.com/photo/5336/hd-white-genshin-impact-game-logo-png)
- The "Genshin Impact" Trailer is taken from their Offical [Genshin Impact](https://www.youtube.com/watch?v=Z1SK-G1B6rY) YouTube Channel 
- The icons for socials is from [Boxicon](https://boxicons.com/)
- The Banner Picture is from [EuroGamer](https://www.eurogamer.net/genshin-impact-4-3-release-date-time-banner-schedule-events-9326)
- The character gameplay gifs are taken from [Genshin impact Fandom](https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki)
- The animated backgrounds for the character showcase are from [Moewalls](https://moewalls.com/) , [Huraka_5281](https://www.youtube.com/watch?v=AbFKDdtWfn8)

### Acknowledgements
Below will be the links to where Me and My Partner received inspiration from :
- Project Inspiration - ["Genshin Impact" game by miHoYo](https://genshin.hoyoverse.com/en/)
- Product Page Functions - [Lun Dev](https://www.youtube.com/watch?v=bCTd1eRX7Iw&t=287s&pp=ygUbaHRtbCByZXNwb25zaXZlIGFkZCB0byBjYXJ0)
- Log In / Sign Up Functions - [ASMRProg](https://www.youtube.com/watch?v=PlpM2LJWu-s&t=219s)
- Quiz Game - [GreatStack](https://www.youtube.com/watch?v=PBcqGxrr9g8)
