<h1>Punk API</h1>

<h2>Task :beer:</h2>
<ul>
    <li>Our fourth challenge at nology was to create a website using an API, where you can filter on differet parameters. Original we had planned to use a live API, however punkAPI was terminated so I have been working with a local API.</li>
</ul>

<h2>Challanges :lady_beetle:</h2>
<ul>
    <li>The main challenge that I came across was on the filters. As I progressed through different parts of creating the website I found that the filters no longer worked. I started with using the API end points, but after I added pagination into the project I switch to filtering them front end using .filter() method.</li>
    <li> Another issue I faced was getting all 300+ objects from the API. After a lot of researched I added a while loop to the API call which add a page after every 50 beers.This loop only breaks when the number of beers left is less that the number of beers I set to be on each page. </li>
</ul>

<h2>Functionality :computer: </h2>
<ul>
    <li> When you first access the website, you see a list of beer product images and names. There are multiple pages which you are able to navigate through.</li>
    <li> There are filters which you can use both on their own and in conjunction with each other. If there are no beers matching what you have filtered, a message will display on the scren to tell you.</li>
    <li> If you click on the beers you are taken to the PDP which give you extra information about the beer including the description and recommended food pairings.</li>
    <li> When you click on the BREWDOG logo at the top it takes you back to the home page and resets all of the filters.</li>
</ul>
