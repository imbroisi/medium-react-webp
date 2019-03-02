# React: use webp images now!

Okay, we love React and we want React for several reasons. Efficiency is one of them. But if we want so much efficiency, why do we still use jpeg and png images in our projects? Images in the wpeg format are 30% to 50% smaller than png/jpeg - or even smaller in certain circumstances.

Well, these are a few wpeg "cons" I have found searching around:

### *"What's wpeg?"*
A lot of people do not know that there is this kind of image, that it is great to use on the web, better than png and jpeg. It is an open source image standard created and maintained by Google. You can learn more about wpeg at: https://developers.google.com/speed/webp/

### *"But not every browser supports wpeg."*
Yes, it's true. It is common that one new standard is not adopted immediately. Well, wpeg is not that new, it has been around for years. Modern browsers have long recognized wpeg.
At the moment this text is being written, these are some browsers supporting wpeg:
- Chrome (great!).
- Firefox.
- Edge.
- Opera.
  
Okay, but not all browsers. So keep reading, please.

### *"But what about browsers that do not support wpeg?"*
There is still a minority of webp non-compliant browsers users.
In this case you can use the technique I use in my React projects.
Does the browser support wpeg? Send him wpeg.
The browser does not accept wpeg? Send him png/jpeg.
That simple.

### *"Hey, it's not that simple."*
Well, it's not simple until it's done, right?

The implementation of this process is the reason for this article.
I will give you the link to my Gihub repository with all the code working inside an example-project, and ready to be reused in your own project.

## React component
The React component is called ImageWebp. It will be included in your project replacing the normal img tag. It includes the option to load the image in wpeg format when the browser is compatible.

When rendering the component, React checks if the browser supports wpeg then rendering with srcWebp. Otherwise, render with src.

## Generating webp images

There are basically two ways to generate webp images:

1) **Exporting your original image directly in webp format.**<br />
Professional image editors, such as Photoshop, already have the option of exporting your image in webp format.

2) **Converting your original image.**<br />
Google provides a free a program that converts jpeg and png to webp. And do not worry about this program usage, in the example-project you have a script that do all the job for you, automatically generating all your images from the existing png/jpeg in your project.

In both export and conversion methods, there are some parameters that let you optimize the image to be generated, helping to maintain a good relationship between quality and size. 

These are the three most commonly used compression types:

- **Lossy**: Lossy compression is based on VP8 key frame encoding. VP8 is a compression format created by On2 Technologies, as successor to the VP6 and VP7 formats. This format admits a small loss of quality (configurable), with considerable decrease in image size.

- **Lossless**: Lossless compression was developed by the WebP team, and works with insignificant quality losses, but generating larger files.

- **Transparency**: useful for graphic images, using 8-bit alpha channel. Alpha channel works only for lossy compression.

You can test different quality factors and compressions to meet your needs, but typically the values ​​used in the exemple-project are efficient in most cases.

## Script for automatic conversion

Within the exemple-project you have a script that automatically scans your entire project for images, and generates the webp images.
- For jpeg: an image with lossy compression is generated with 30% minimum reduction in file size.
  
- For png: two images are generated: one with lossyless compression and one with transparent lossy compression. So you can decide which of the two formats is most suitable for a particular png image. This is because depending on the png image, a format can generate a webp with better relation quality/size. But usually lossy transparent is the best choice.

Important to note that the script never overwrites an existing webp, it just creates new ones. So if you manually include a webp in your project, the script will never overwrite it.

You can see the final result from the example-project here:

https://imbroisi.github.io/medium-react-webp/

And this is the example-project repository:

https://github.com/imbroisi/medium-react-webp

To use the component in your project simply make a copy of the ImageWebp file.

I hope you enjoy the results.

*"If you don't use webp in you projects, you will be assimilated.<br />
Resistance is futile. "*<br />
The Borg.
