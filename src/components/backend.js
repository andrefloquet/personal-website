import GalleryItem from '@/components/gallery-item';
import CardContainer from '@/components/card-container';

// images
import php from '@/../public/images/php.png'
import laravel from '@/../public/images/laravel.png'
import zend from '@/../public/images/zend.png'
import wordpress from '@/../public/images/wordpress.png'
import nodejs from '@/../public/images/nodejs.png'
 import expressjs from '@/../public/images/expressjs.png'
import nestjs from '@/../public/images/nestjs.png'
import python from '@/../public/images/python.png'
import django from '@/../public/images/django.png'
import flask from '@/../public/images/flask.png'

export default function Backend() {
    return (
        <section className="max-w-9/10 mx-auto my-10">
            <h2 className="text-center text-4xl mb-16 md:text-left">Backend</h2>
            <CardContainer>

                    <GalleryItem 
                        src={php} 
                        alt="Picture of PHP Program Language." 
                        title="PHP" 
                        subtitle="PHP Program Language"
                    />

                    <GalleryItem 
                        src={laravel} 
                        alt="Picture of Laravel Framework." 
                        title="Laravel" 
                        subtitle="Laravel Framework"
                    />

                    <GalleryItem 
                        src={zend} 
                        alt="Picture of Zend Framework." 
                        title="Zend" 
                        subtitle="Zend Framework"
                    />

                    <GalleryItem 
                        src={wordpress} 
                        alt="Picture of WordPress CMS." 
                        title="WordPress" 
                        subtitle="WordPress CMS"
                    /> 

                    <GalleryItem 
                        src={nodejs} 
                        alt="Picture of Nodejs Program Language." 
                        title="Nodejs" 
                        subtitle="Nodejs Program Language"
                    />   

                    <GalleryItem 
                        src={expressjs} 
                        alt="Picture of ExpressJs Framework." 
                        title="ExpressJs" 
                        subtitle="ExpressJs Framework"
                    />

                    <GalleryItem 
                        src={nestjs} 
                        alt="Picture of NestJs Framework." 
                        title="NestJs" 
                        subtitle="NestJs Framework"
                    />

                    <GalleryItem 
                        src={python} 
                        alt="Picture of Python Program Language." 
                        title="Python" 
                        subtitle="Python Program Language"
                    />

                    <GalleryItem 
                        src={django} 
                        alt="Picture of Django Framework." 
                        title="Django" 
                        subtitle="Django Framework"
                    />   

                    <GalleryItem 
                        src={flask} 
                        alt="Picture of Flask Framework." 
                        title="Flask" 
                        subtitle="Flask Framework"
                    />                                     

                </CardContainer>                                                        
        </section>
    )
}