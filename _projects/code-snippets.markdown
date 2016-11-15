---
layout: page
title:  "Lorem ipsum dolor"
img: page-6.jpg
excerpt: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium non
---


Whenever you need to post a code snippet, use the liquid tags `hilight` and `endhilight` like this:

{% highlight ruby %}
# some code goes here
puts "Hello World!"
{% endhighlight %}

![image]({{ site.baseurl }}/{{ site.image_location }}/post/big/{{ page.img }})

Note that this only provides color-coding. For that you might need to use a front end colorization engine like Highlight.JS or something similar.
