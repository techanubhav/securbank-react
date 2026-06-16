import { useEffect, useState } from "react"
import './articles.css';

function Articles() {
    const [articles, setArticles] = useState(null)
    const [error, setError] = useState(null)

    const aempublishurl = process.env.REACT_APP_HOST_URI || 'https://publish-p93711-e854864.adobeaemcloud.com';

    useEffect(() => {
        async function fetchCF() {
            const queryPath = `/graphql/execute.json/securbank/ArticleList?ts=${Date.now()}`;
            const url = aempublishurl + queryPath;

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
    }, [aempublishurl]);

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
                const resource = `urn:aemconnection:${article._path}/jcr:content/data/master`;
                const imageURL = article.heroImage?._dynamicUrl
                    ? `${aempublishurl}${article.heroImage._dynamicUrl}&width=470`
                    : article.heroImage?._publishUrl
                        ? `${article.heroImage._publishUrl}&width=470`
                        : null;

                return (
                    <li
                        key={article._path}
                        data-aue-resource={resource}
                        data-aue-type="reference"
                        data-aue-filter="cf"
                        data-aue-label={article.headline}
                    >
                        {imageURL ? (
                            <img
                                data-aue-prop="heroImage"
                                data-aue-type="image"
                                data-aue-label="Hero image"
                                className="articleImage"
                                src={imageURL}
                                alt=""
                            />
                        ) : (
                            <div
                                data-aue-prop="heroImage"
                                data-aue-type="image"
                                data-aue-label="Hero image"
                                className="articleImage articleImage--empty"
                                aria-hidden="true"
                            />
                        )}
                        <h5
                            data-aue-prop="headline"
                            data-aue-type="text"
                            data-aue-label="Headline"
                            className="articleHeading"
                        >
                            {article.headline}
                        </h5>
                        <div
                            data-aue-prop="main"
                            data-aue-type="richtext"
                            data-aue-label="Main text"
                            className="articleDescription"
                        >
                            {article.main?.plaintext}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default Articles;
