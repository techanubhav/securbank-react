import { useEffect, useState } from "react"
import './articles.css';

function Articles() {

    const [showArticles, setshowArticles] = useState()
    const aempublishurl = 'https://publish-p92819-e844539.adobeaemcloud.com';
    const aemauthorurl = 'https://author-p92819-e844539.adobeaemcloud.com';
    const aemurl = `/graphql/execute.json/securbank/ArticleList?ts=${Math.random()*1000}`;
    let displayData
    let options = {credentials: "include"};
    

    async function fetchCF() {
        let url = aempublishurl + aemurl
        console.log(window.location.ancestorOrigins.length)
        if(window.location && window.location.ancestorOrigins.length > 0) {
            url = aemauthorurl + aemurl
        }
        console.log(url);
        const response = await fetch(url, options)
        // TODO - Add error handling here
        const responseData = await response.json()
        // TODO - Add error handling here
        let itemId, imageURL


        console.log(responseData)
        displayData = responseData.data.articleList.items.map(function(article,index) {
            itemId =  "urn:aemconnection:" + article._path + "/jcr:content/data/master";
            //imageURL = aempublishurl + article.heroImage._dynamicUrl + "&width=470";
            imageURL = aempublishurl + article.heroImage._publishUrl + "&width=470";

            return(
                <li key={index} itemScope itemID={itemId} itemType="reference" itemfilter="cf">
                    <img itemProp="heroImage" itemType="image" className="articleImage" src={imageURL} />
                    <h5 itemProp="headline" itemType="text" className="articleHeading">{article.headline}</h5>
                    <div itemProp="main" itemType="richtext" className="articleDescription">{article.main['plaintext']}</div>
                </li>
            )
        })
        setshowArticles(displayData)

    }

    useEffect(() => {
        fetchCF()
    },[])

    return (
        <ul className="articleList">
        {showArticles}
        </ul>
    )

}




export default Articles;