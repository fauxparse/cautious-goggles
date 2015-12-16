![Logo](mlg-goggles.png)

# The Cautious Goggles

A browser extension (Chrome/Firefox/etc) which lets you be cautious about what spoilers you see.

## v1 - The Basic Blocker

Allow the user to enter a list of terms they want to be cautious about (eg. "Star Wars Episode 7"). When they
visit a webpage, black out any paragraphs with text related to those terms and allow them to click on it to
reveal it. This is the standard part.

## v2 - The Pinprick Presenter

When the user mouses over the blacked-out text, simple words and phrases should appear. These can't be long
enough (or complete enough) to show any spoilers, but should be enough to give an idea of the page content.
For example, "Luke's father" is fine, but "Vader is Luke's father" is not.

## v3 - The Finger Flickerer

Make this more fun by including an option to switch from the standard blocker to a WebGL (or similar) one
which shows the shadow of fingers over the webpage (as if you have your hands over your eyes trying not to
look). These should move slightly as you move the mouse, and slowly widen (to show more of the page) when
you click repeatedly.

## v4 - The Automatic Advisor

Summarise what the page is about (still without spoilers!) and present it in a popup when you open the page.
