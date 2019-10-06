import { Button, Carousel, Loader } from "../../../../components";
import {
    ProductsList_categories,
    ProductsList_shop_homepageCollection_backgroundImage
} from "../../types/ProductsList";

import { Link } from "react-router-dom";
import React from 'react';
import { generateCategoryUrl } from "../../../../core/utils";

interface HeroCarouselProps {
    categories: ProductsList_categories;
    loading: boolean;
    backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
    sections?: string[] // TODO[sebastian]: This needs to be enriched
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ backgroundImage, categories, loading }) => {
    const singleSlide = () => {
        return (
            <div
            className="home-page__hero"
            style={
              backgroundImage
                ? { backgroundImage: `url(${backgroundImage.url})` }
                : null
            }
          >
            <div className="home-page__hero-text">
              <div>
                <span className="home-page__hero__title">
                  <h1>Final reduction</h1>
                </span>
              </div>
              <div>
                <span className="home-page__hero__title">
                  <h1>Up to 70% off sale</h1>
                </span>
              </div>
            </div>
            <div className="home-page__hero-action">
              {loading && !categories ? (
                <Loader />
              ) : (
                <Link
                  to={generateCategoryUrl(
                    categories.edges[0].node.id,
                    categories.edges[0].node.name
                  )}
                >
                  <Button>Shop sale</Button>
                </Link>
              )}
            </div>
          </div>
        )
    }
    const slidesContent = () => {
        const finalContent = [];
        for (let i = 0 ; i < 4; i++) {
            finalContent.push(singleSlide());
        }
        return finalContent
    }
     
    return (<Carousel slidesPerView={1}>
         {slidesContent()} 
    </Carousel>)
}