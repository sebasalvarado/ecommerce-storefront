import "./scss/index.scss";

import * as React from "react";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage
} from "./types/ProductsList";

import { HeroCarousel } from './components';
import { Link } from "react-router-dom";
import { ProductsFeatured } from "../../components";
import classNames from "classnames";
import { generateCategoryUrl } from "../../core/utils";
import noPhotoImg from "../../images/no-photo.svg";
import { structuredData } from "../../core/SEO/Homepage/structuredData";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => (
  <>
    <script className="structured-data-list" type="application/ld+json">
      {structuredData(shop)}
    </script>
    <HeroCarousel categories={categories} loading={loading} backgroundImage={backgroundImage} />
    <ProductsFeatured />
    <div className="home-page__categories">
      <div className="container">
        <h3>Shop by category</h3>
        <div className="home-page__categories__list">
          {categories.edges.map(({ node: category }) => (
            <div key={category.id}>
              <Link
                to={generateCategoryUrl(category.id, category.name)}
                key={category.id}
              >
                <div
                  className={classNames("home-page__categories__list__image", {
                    "home-page__categories__list__image--no-photo": !category.backgroundImage,
                  })}
                  style={{
                    backgroundImage: `url(${
                      category.backgroundImage
                        ? category.backgroundImage.url
                        : noPhotoImg
                    })`,
                  }}
                />
                <h3>{category.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

export default Page;
