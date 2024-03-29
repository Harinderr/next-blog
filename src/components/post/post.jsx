import Image from "next/image"
import Link from "next/link"
import styles from "@/components/post/post.module.css"

export default function Post({src,title,content,date,id}) {
    const dateobj = new Date(date);
    const simpledate  =   dateobj.toISOString().split('T')[0];
    
   
    return (
        <div className={`${styles.post_container} w-full h-64 relative`} id={id}>
          <div className={styles.content}>
          <Link href={`/${title}/${id}`} className="m-4">{title}</Link>
          <p className={styles.paragraph}>{content} </p> </div>  
            <Image alt="no image" className="w-full h-40" src={src} width={300} height={300} ></Image>
            <div className={`${styles.time} absolute bottom-2 right-2`}> <i className="fa-solid fa-clock"></i> {simpledate}</div>
        </div>
    )
}