import GalleryItem from '@/components/gallery-item';
import CardContainer from '@/components/card-container';

// images
import oracle from '@/../public/images/oracle.png'
import postgresql from '@/../public/images/postgresql.png'
import sqlserver from '@/../public/images/sqlserver.png'
import mysql from '@/../public/images/mysql.png'
import mongodb from '@/../public/images/mongodb.png'

export default function Database() {
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
        </section>
    )
}