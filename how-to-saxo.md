#How to use the feature article template

[LIVE DEMO](http://thegazette.com/subject/news/the-harkin-legacy-20141130)

Stories that use the feature article template are posted in Saxo, just like every other story. They are posted a little differently, however.

First off, you will need to change the Category of the story to Feature Article Template. This is under Properties in Saxo.

The story, like all others, needs a headline (which is put in the "Title" field) and byline information. If you include a "Title" and a "Subtitle", both will appear within the first slide. The story's publication date will also be added to that slide.

Stories are broken into several paragraphs, instead of being put all into the first paragraph. Each paragraph becomes a chapter in the feature article template (see the Harkin story for an example) and must have a photo and a headline attached to it. The one exception is the first paragraph, which shouldn't have a photo or a headline. The photo for this section is the Main photo attached to the story. The headline is the Title for the story.

You can have up to eight paragraphs in the story. Also make sure to pick good photos with each paragraph, as they are featured prominently with the template.

There are also several types of content you can post within the paragraphs. They are listed below:

##Summary
The template has a grey summary box at the beginning of the first chapter. To add text to the box, enter it into the "Summary" field in the story in the Edit UI. NOTE: HTML is valid.

If you'd like to change the header of that box, use the "Pull Quote" field. Otherwise, it will default to "Highlights from this story".


##Quotes
Blockquote:
```html
<div class="blockquote">
<p class="quote">This is where a block quote will go. Block quotes are super exciting. You should probably be really pumped to have one on your page.</p>
<p class="attribution">- Frank Johnson</p>
<p class="detail">He is a super cool dude so you should listen to him</p>
<div class="blockquote-clear" style="clear: both;"> </div>
</div>
```

Pullquote:
```html
<div class="pullquote right">
<p class="quote">"This is the quote for the story. I hope that you find it really compelling and fun."</p>
<p class="attribution">- Frank Johnson</p>
<p class="detail">On being an awesome guy</p>
</div>
```

The “left” property on the pull quote div will make the quote float to the left of the screen. You can change this property to “right” to make it float to the right instead. For more information on these properties, read on.

##iFrames
You can post iFrames within the paragraphs, like you can with other stories. You also have a few style options to decide how you want them placed on the page:

Lazyload:
- If you add the class of "lazyload" to the DIV surrounding the iFrame, this is allow the content not to be loaded until the reader scrolls to it on the screen. This is highly recommended because it makes the page load much faster.

Center:
- If you add the class of "center" to the DIV surrounding the iFrame, the content will have -25% margin to the left and right. The width of the content will be 150%, so it will will be wider than paragraph text itself. This is good for embeds that you want to show prominently.

Center without margins
- If you add the class of "center-no-margin" to the DIV surrounding the iFrame, the content will be the same width as the paragraphs and will be aligned in the center. This is good for videos and photos.

Left
- If you add the class of "left" to the DIV surrounding the iFrame, it will float it to the left and the paragraph text will wrap to its right. This is good for embeds with a narrow width, photos and pull quotes.

Right
- Same as "left" only it floats the embed to the right.

###Examples
Examples of lazyload and center:
```html
<div class="lazyload"><!--
<div class="center">
<iframe frameborder="0" height="325" src="http://files.gazlab.com/content-host/jm/poverty-pct-table.html" width="100%">
</div>
--></div>
```

Example of lazyload and center without margins:
```html
<div class="lazyload"><!--
<div class="center-no-margin">
<iframe frameborder="0" height="325" src="http://files.gazlab.com/content-host/jm/poverty-pct-table.html" width="100%"></iframe>
</div>
--></div>
```

Example of lazyload and left:
```html
<div class="lazyload"><!--
<div class="left">
<h3 style="width: 420px;">Cedar Rapids speed cameras on Interstate 380</h3>
<iframe frameborder="0" height="690" src="http://files.gazlab.com/content-host/locatormaps/map-i380-cameras.html" width="420"></iframe>
</div>
--></div>
```

##Embeds
You can use all the embed code spots under "Extra Fields" in the story to embed content like you would with any other story. The difference is you will need to decide exactly where you want the content to go within the article.

So to post a Bimvid video, for example, add the video's id to the Bimvid id 1 spot. Then add this DIV wherever you want the video to go on the page:
```html
<div id="bimvidid1" class="center"></div>
```

Note: You can use all of the classes listed under iFrames above. You also don't need to use the "lazyload" class, as it is automatically added.

To use the embed code 1 spot, add the following on the page:
```html
<div id="embedcode1" class="center-no-margin"></div>
```

You can also use the name field to include a header above the embed

If one of you  embed code spots is a video, wrap it in a div with the ID of "mediawell-video-holder" like so:
```html
<div id="mediawell-video-holder">
<script src='http://player.bimvid.com/v2/vp/kcrg/108d438a60eca86718f298c7aaf78738fc2b95ec'></script>
</div>
```

To use a Slideshow pro gallery:
```html
<div id="slideshowproid" class="center"></div>
```

##Photos
You can also place as many photos as you want within the story. First, upload the photos into the Pictures section of the story, like you would any other story.

If you want to post an individual photo, use this:
```html
<div id="extrapicture2" class="extrapicture_ind right"></div>
```

That will post Extra Picture 2. If you want to post a different photo, just change the number within the DIV's id.

If you want to post a gallery of all the extra pictures, use this DIV:
```html
<div id="extrapictures" class="center"></div>
```

##Ads:
We must put two ads on the page somehwere. You have the freedom to decide where they will go. 

This should go in the second chapter or later
```html
<div id="ad-medrec-top" class="right">
<script type="text/javascript">
googletag.cmd.push(function() { googletag.display('ad-medrec-top'); });
</script>
</div>
```
This should go in the fourth chapter or later:
```html
<div id="ad-medrec-bottom" class="left">
<script type="text/javascript">
googletag.cmd.push(function() { googletag.display('ad-medrec-bottom'); });
</script>
</div>
```
Note: You can change the class name if you want but leave the id name


##Teasing the story
For promotional purposes, we need to create a separate article with the story's main photo, the first paragraph, an external link to the actual story's URL and all the appropriate taxonomies and profiles. This second article is what is put in the rotator and promoted on the index pages.

There’s a few reasons we do it this way. The short of it is our site likes it better when it’s set up this way. Things can get funky on the index pages if we try to promote the actual story and not the article with the external link.