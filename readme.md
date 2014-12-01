#The Harkin legacy

[LIVE](http://thegazette.com/subject/news/the-harkin-legacy-20141130)

This is the code that runs our story on the retirement of U.S. Senator Tom Harkin. It uses the [Skrollr library](https://github.com/Prinzhorn/skrollr) for it's parallex scrolling effect.

We use it like so: The posted like any other story\ in our Saxo CMS, only it used a different article template to make it look like it does. Stories are broken into paragraphs, with each paragraph having a photo and title attached to it. These photos have the parallex scrolling effect applied to them. We've also given editors the ability to put content (photos, videos, etc.) inside the paragraphs using empty DIVs with certain ids. This template then puts the actual content within those DIVs after the page is loaded.

For more information, read how-to-saxo.md, which is our guide to using the template for our editors.
