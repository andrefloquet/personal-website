import GalleryItem from '@/components/gallery-item';
import CardContainer from '@/components/card-container';

// images
import html from '@/../public/images/html.png'
import css from '@/../public/images/css.png'
import tailwindcss from '@/../public/images/tailwindcss.png'
import bootstrap from '@/../public/images/bootstrap.png'
import sass from '@/../public/images/sass.png'
import uiux from '@/../public/images/uiux.png'
import seo from '@/../public/images/seo.png'
import javascript from '@/../public/images/javascript.png'
import reactjs from '@/../public/images/reactjs.png'
import nextjs from '@/../public/images/nextjs.png'
import vuejs from '@/../public/images/vuejs.png'
import nuxtjs from '@/../public/images/nuxtjs.png'
import alpinejs from '@/../public/images/alpinejs.png'
import livewire from '@/../public/images/livewire.png'
import jquery from '@/../public/images/jquery.png'

export default function Frontend() {
    return (
        <section className="max-w-9/10 mx-auto my-10">
            <h2 className="text-center text-4xl mb-16 md:text-left">Frontend</h2>
            <CardContainer>

                <GalleryItem 
                    src={html} 
                    alt="Picture of HTML Markup Language." 
                    title="HTML" 
                    subtitle="HTML Markup Language"
                />                

                <GalleryItem 
                    src={css} 
                    alt="Picture of CSS3." 
                    title="Css3" 
                    subtitle="Cascading Style Sheets."
                />    

                <GalleryItem 
                    src={tailwindcss} 
                    alt="Picture of TailwindCss Framework." 
                    title="TailwindCss" 
                    subtitle="TailwindCss Framework"
                />   

                <GalleryItem 
                    src={bootstrap} 
                    alt="Picture of BootstrapCss Framework." 
                    title="BootstrapCss" 
                    subtitle="BootstrapCss Framework"
                /> 

                <GalleryItem 
                    src={sass} 
                    alt="Picture of SASS CSS Framework." 
                    title="SASS CSS" 
                    subtitle="SASS CSS Framework"
                />   

                <GalleryItem 
                    src={uiux} 
                    alt="Picture of UI/UX Design." 
                    title="UI/UX" 
                    subtitle="UI/UX Design"
                />   

                <GalleryItem 
                    src={seo} 
                    alt="Picture of SEO." 
                    title="SEO" 
                    subtitle="Search Engine Optimization."
                />                                                                                     

                <GalleryItem 
                    src={javascript} 
                    alt="Picture of Javascript Program Language." 
                    title="Javascript" 
                    subtitle="Javascript Program Language"
                /> 

                <GalleryItem 
                    src={reactjs} 
                    alt="Picture of Reactjs Framework." 
                    title="Reactjs" 
                    subtitle="Reactjs Framework"
                />     

                <GalleryItem 
                    src={nextjs} 
                    alt="Picture of Nextjs Framework." 
                    title="Nextjs" 
                    subtitle="Nextjs Framework"
                />     

                <GalleryItem 
                    src={vuejs} 
                    alt="Picture of Vuejs Framework." 
                    title="Vuejs" 
                    subtitle="Vuejs Framework"
                />    

                <GalleryItem 
                    src={nuxtjs} 
                    alt="Picture of Nuxtjs Framework." 
                    title="Nuxtjs" 
                    subtitle="Nuxtjs Framework"
                />   

                <GalleryItem 
                    src={alpinejs} 
                    alt="Picture of Alpinejs Framework." 
                    title="Alpinejs" 
                    subtitle="Alpinejs Framework"
                />    

                <GalleryItem 
                    src={livewire} 
                    alt="Picture of Laravel-Livewire Framework." 
                    title="Laravel-Livewire" 
                    subtitle="Laravel-Livewire Framework"
                />                        

                <GalleryItem 
                    src={jquery} 
                    alt="Picture of JQuery Framework." 
                    title="JQuery" 
                    subtitle="JQuery Framework"
                />                                                                                                                                                           

            </CardContainer>                                                        
        </section>
    )
}