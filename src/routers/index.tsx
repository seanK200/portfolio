import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutView from '../views/About';
import BlogView from '../views/Blog';
import DefaultLayout from '../views/DefaultLayout';
import HomeView from '../views/Home';
import PortfolioView from '../views/Portfolio';
import PostView from '../views/Post';

const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomeView />} />
        <Route path="portfolio" element={<PortfolioView />} />
        <Route path="blog" element={<BlogView />} />
        <Route path="post/:id" element={<PostView />} />
        <Route path="about" element={<AboutView />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
