# React: use WebP images now!

## How to easily use WebP in your React projects.

We love React and we want React for several reasons. Efficiency is one of them. But if we want so much efficiency, why do we still use jpeg and png images in our projects? Images in the WebP format are 30% to 50% smaller than png/jpeg - or even smaller in many cases.

Well, these are a few WebP "cons" I have found searching around:

### *"What's WebP?"*

Many people are unaware that this type of image exists, that WebP is great to be used on the web, better than png and jpeg. 
Webp is an open source image standard created and maintained by Google. You can learn more about WebP at: https://developers.google.com/speed/webp/

### *"But not every browser supports WebP"*

Yes, it's true. It is very common that a new standard is not adopted immediately. That's a big problem for WebP, isn't it?<br />
No, it is not.<br />
WebP is not so new. It's been around for years, and modern browsers have long recognized WebP. At the moment this text is being written, these are some browsers supporting WebP:

- Chrome (great!).
- Firefox.
- Edge.
- Opera.
- And many others.
  
Okay, but not all browsers. So keep reading, please.

### *"But what about browsers that do not support WebP?"*

There is still a minority of users using browsers not compatible with WebP.
Another big problem for WebP? No, it is not too.<br />
For this cases you will use the same technique I use in my React projects.<br />
Does the browser support WebP? React gives WebP.<br />
The browser does not accept WebP? React gives png/jpeg.<br />
That simple.

### *"Hey, it's not that simple."*

Well, we cant't say it's simple until it's working fine in production, right?

So, how to do that is the reason I am writing now.

At the end for this article you will have the link to my Gihub repository with all the code working inside an example-project, and ready to be reused in your own project.

But first, some explanation.

## React component

The React component is called ImageWebp. It will be included in your project replacing the normal img tag. It includes the option to load the image in WebP format when the browser is compatible.

When rendering the component, React checks if the browser supports WebP then rendering with srcWebp. Otherwise, render with src.

## Generating WebP images

There are basically two ways to generate WebP images:

1) **Exporting your original image directly in WebP format.**<br />
Professional image editors, such as Photoshop, already have the option of exporting your image in WebP format.

2) **Converting your original image.**<br />
Google provides a free a program that converts jpeg and png to WebP. And do not worry about this program usage, in the example-project you have a script that do all the job for you, automatically generating all your images from the existing png/jpeg in your project.

In both export and conversion methods, there are some parameters that let you optimize the image to be generated, helping to maintain a good relationship between quality and size. 

These are the three most commonly used compression types:

- **Lossy**: Lossy compression is based on VP8 key frame encoding. VP8 is a compression format created by On2 Technologies, as successor to the VP6 and VP7 formats. This format admits a small loss of quality (configurable), with considerable decrease in image size.

- **Lossless**: Lossless compression was developed by the WebP team, and works with insignificant quality losses, but generating larger files.

- **Transparency**: useful for graphic images, using 8-bit alpha channel. Alpha channel works only for lossy compression.

You can test different quality factors and compressions to meet your needs, but typically the values ​​used in the exemple-project are efficient in most cases.

## Instaling the example-project

To run de exemple-project, you need:

- Node >= 10
- Npm >= 6

Then clone, install and run the project:

    git clone git@github.com:imbroisi/medium-react-webp.git
    cd medium-react-webp
    npm install
    npm start

To use the component in your project simply copy the ImageWebp file.

## Script for automatic conversion

Within the exemple-project you have a script that automatically scans your entire project for images, and generates the WebP images.

- For jpeg: an image with lossy compression is generated with 30% minimum reduction in file size.
  
- For png: two images are generated: one with lossyless compression and one with transparent lossy compression. So you can decide which of the two formats is most suitable for a particular png image. This is because depending on the png image, a format can generate a WebP with better relation quality/size. But usually lossy transparent is the best choice.

Important to note that the script never overwrites an existing WebP, it just creates new ones. So if you manually include a WebP in your project, the script will never overwrite it.

To let the script do their job, just:

    npm run webp

## Conclusion

You can see the final production result from the example-project here:

https://imbroisi.github.io/medium-react-webp/

I hope you enjoy the results in your project.

*"If you don't use WebP in you projects, you will be assimilated.<br />
Resistance is futile. "*<br />
The Borg.
