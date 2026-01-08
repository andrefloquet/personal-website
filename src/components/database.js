'use client'

import { usePathname } from 'next/navigation'

import GalleryItem from '@/components/gallery-item';
import CardContainer from '@/components/card-container';

// images
import oracle from '@/../public/images/oracle.png'
import postgresql from '@/../public/images/postgresql.png'
import sqlserver from '@/../public/images/sqlserver.png'
import mysql from '@/../public/images/mysql.png'
import mongodb from '@/../public/images/mongodb.png'

export default function Database() {

    const pathname = usePathname()

    return (
        <section className="max-w-9/10 mx-auto my-20">
            <h2 className="text-center text-4xl mb-16 md:text-left">Database</h2>
            <CardContainer>

                <GalleryItem 
                    src={oracle} 
                    alt="Picture of Oracle." 
                    title="Oracle" 
                    subtitle="Oracle database"
                />

                <GalleryItem 
                    src={postgresql} 
                    alt="Picture of PostgreSql." 
                    title="PostgreSql" 
                    subtitle="PostgreSql database"
                />  

                <GalleryItem 
                    src={sqlserver} 
                    alt="Picture of SqlServer." 
                    title="SqlServer" 
                    subtitle="MS SqlServer database"
                />     

                <GalleryItem 
                    src={mysql} 
                    alt="Picture of MySql." 
                    title="MySql" 
                    subtitle="MySql database"
                />       

                <GalleryItem 
                    src={mongodb} 
                    alt="Picture of MongoDb." 
                    title="MongoDb" 
                    subtitle="MongoDb database"
                />                                                                      

            </CardContainer>  

            {pathname === '/skills/database' && (
                <>
                    <p className="text-center my-8 md:text-left">
                        On this small web application, I am using Laravel as Backend/API, Nextjs as Frontend/SPA and TailwindCss/UI. 
                        This is just a way to prove my backend, frontend, database and DevOps skills running on a production envrionment. 
                        The backend is hosted on AWS Lambda/Serverless via Vapor. 
                        The frontend is hosted on Vercel Serverless envrionment. 
                        You can access this app on 
                        <a className="text-sky-600 hover:text-sky-800 hover:border-sky-800 hover:border-b-2" href='https://app.andrefloquet.com' target='_blank'> https://app.andrefloquet.com</a>
                    </p>
                    
                    <div className="flex justify-center w-full mx-auto h-120 my-10 md:h-140 md:max-w-9/10">
                        <iframe
                            className="inset-0 w-full h-full"
                            src="https://www.youtube-nocookie.com/embed/iQ3tlgtcRA4"
                            title="My app resume"
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </>
            )} 

        </section>
    )
}