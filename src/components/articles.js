import { useEffect, useState } from "react"
import './articles.css';

function Articles() {
    const [articles, setArticles] = useState(null)
    const [error, setError] = useState(null)

    const aempublishurl = process.env.REACT_APP_HOST_URI || 'https://publish-p93711-e854864.adobeaemcloud.com';
    const aemauthorurl = process.env.REACT_APP_AEM_AUTHOR_URI || 'https://author-p93711-e854864.adobeaemcloud.com';

    useEffect(() => {
        async function fetchCF() {
            const queryPath = `/graphql/execute.json/securbank/ArticleList?ts=${Date.now()}`;
            const isAuthoring = window.location?.ancestorOrigins?.length > 0;
            const baseUrl = isAuthoring ? aemauthorurl : aempublishurl;
            const url = baseUrl + queryPath;

            try {
                const response = await fetch(url, { credentials: "include" });
                if (!response.ok) {
                    throw new Error(`AEM request failed (${response.status})`);
                }

                const responseData = await response.json();
                if (responseData.errors?.length) {
                    throw new Error(responseData.errors[0].message);
                }

                const items = responseData?.data?.articleList?.items;
                if (!items) {
                    throw new Error('Unexpected response from AEM GraphQL');
                }

                setArticles(items);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchCF();
    }, [aemauthorurl, aempublishurl]);

    if (error) {
        return <p className="articleStatus">Unable to load articles: {error}</p>;
    }

    if (!articles) {
        return <p className="articleStatus">Loading articles…</p>;
    }

    if (articles.length === 0) {
        return <p className="articleStatus">No articles available.</p>;
    }

    return (
        <ul className="articleList">
            {articles.map((article) => {
                const itemId = `urn:aemconnection:${article._path}/jcr:content/data/master`;
                const imageURL = article.heroImage?._dynamicUrl
                    ? `${aempublishurl}${article.heroImage._dynamicUrl}&width=470`
                    : article.heroImage?._publishUrl
                        ? `${article.heroImage._publishUrl}&width=470`
                        : null;

                return (
                    <li key={article._path} itemScope itemID={itemId} itemType="reference" itemfilter="cf">
                        {imageURL && (
                            <img
                                itemProp="heroImage"
                                itemType="image"
                                className="articleImage"
                                src={imageURL}
                                alt=""
                            />
                        )}
                        <h5 itemProp="headline" itemType="text" className="articleHeading">{article.headline}</h5>
                        <div itemProp="main" itemType="richtext" className="articleDescription">
                            {article.main?.plaintext}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default Articles;
