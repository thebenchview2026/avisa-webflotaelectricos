-- ================================================
-- AVISA WebFlotaElectricos — SUPABASE SCHEMA
-- Paso 1: Ejecutar este archivo primero en el
--         Supabase SQL Editor
-- ================================================

--
-- PostgreSQL database dump
--


-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: brands; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.brands (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    logo_url text,
    description text,
    country text
);


--
-- Name: dealers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dealers (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    brand text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    province text NOT NULL,
    phone text,
    email text,
    lat real,
    lng real,
    google_maps_url text,
    brand_logos text[],
    active boolean DEFAULT true,
    sort_order integer DEFAULT 0
);


--
-- Name: editorial_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.editorial_content (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    type text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    excerpt text,
    content text NOT NULL,
    category text,
    tags text[],
    author text DEFAULT 'Grupo Avisa'::text,
    featured_image text,
    published boolean DEFAULT false,
    published_at timestamp without time zone,
    updated_at timestamp without time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now(),
    meta_title text,
    meta_description text,
    reading_time integer DEFAULT 5,
    related_slugs text[],
    related_vehicle_type text
);


--
-- Name: faq_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.faq_categories (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    icon text,
    description text,
    sort_order integer DEFAULT 0
);


--
-- Name: faqs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.faqs (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    category_id character varying NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    video_url text,
    sort_order integer DEFAULT 0,
    published boolean DEFAULT true,
    slug text DEFAULT ''::text NOT NULL,
    meta_title text,
    meta_description text,
    related_slugs text[],
    home_featured boolean DEFAULT false
);


--
-- Name: maintenance_plans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.maintenance_plans (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    price real NOT NULL,
    features text[],
    highlighted boolean DEFAULT false,
    sort_order integer DEFAULT 0
);


--
-- Name: pages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    content text,
    meta_title text,
    meta_description text,
    published boolean DEFAULT true
);


--
-- Name: promotions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.promotions (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    subtitle text,
    vehicle_type text NOT NULL,
    brand_name text,
    model_name text,
    image_url text,
    price real,
    monthly_payment text,
    features text[],
    badge text,
    link text,
    active boolean DEFAULT true,
    sort_order integer DEFAULT 0
);


--
-- Name: sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sections (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    page_slug text NOT NULL,
    section_key text NOT NULL,
    title text,
    subtitle text,
    content jsonb,
    image_url text,
    active boolean DEFAULT true,
    sort_order integer DEFAULT 0
);


--
-- Name: seo_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.seo_metadata (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    path text NOT NULL,
    entity_type text,
    entity_id character varying,
    meta_title text,
    meta_description text,
    canonical text,
    noindex boolean DEFAULT false,
    og_title text,
    og_description text,
    og_image text,
    json_ld_type text,
    priority real DEFAULT 0.5,
    changefreq text DEFAULT 'monthly'::text,
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.services (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    icon text,
    features text[],
    category text DEFAULT 'postventa'::text,
    active boolean DEFAULT true,
    sort_order integer DEFAULT 0
);


--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_settings (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    key text NOT NULL,
    value text,
    category text DEFAULT 'general'::text
);


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.testimonials (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    role text,
    company text,
    rating integer DEFAULT 5 NOT NULL,
    content text NOT NULL,
    image_url text,
    published boolean DEFAULT true,
    sort_order integer DEFAULT 0
);


--
-- Name: topic_clusters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.topic_clusters (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    pillar_title text NOT NULL,
    pillar_description text,
    pillar_keywords text,
    category text,
    supporting_pages jsonb DEFAULT '[]'::jsonb,
    internal_links jsonb DEFAULT '[]'::jsonb,
    content_depth integer DEFAULT 0,
    status text DEFAULT 'draft'::text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'admin'::text,
    display_name text,
    email text,
    active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: vehicles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vehicles (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    brand_id character varying NOT NULL,
    model text NOT NULL,
    slug text NOT NULL,
    year integer NOT NULL,
    price real NOT NULL,
    body_type text NOT NULL,
    range_km integer NOT NULL,
    battery_kwh real NOT NULL,
    power_hp integer NOT NULL,
    acceleration real,
    top_speed integer,
    seats integer DEFAULT 5 NOT NULL,
    drivetrain text DEFAULT 'FWD'::text,
    charging_time_fast text,
    charging_time_slow text,
    trunk_liters integer,
    weight integer,
    image_url text,
    gallery_urls text[],
    description text,
    short_description text,
    featured boolean DEFAULT false,
    available boolean DEFAULT true,
    meta_title text,
    meta_description text,
    video_url text,
    vehicle_type text DEFAULT 'electrico'::text
);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- Name: brands brands_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_slug_unique UNIQUE (slug);


--
-- Name: dealers dealers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dealers
    ADD CONSTRAINT dealers_pkey PRIMARY KEY (id);


--
-- Name: editorial_content editorial_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.editorial_content
    ADD CONSTRAINT editorial_content_pkey PRIMARY KEY (id);


--
-- Name: editorial_content editorial_content_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.editorial_content
    ADD CONSTRAINT editorial_content_slug_key UNIQUE (slug);


--
-- Name: faq_categories faq_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faq_categories
    ADD CONSTRAINT faq_categories_pkey PRIMARY KEY (id);


--
-- Name: faq_categories faq_categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faq_categories
    ADD CONSTRAINT faq_categories_slug_unique UNIQUE (slug);


--
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- Name: maintenance_plans maintenance_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.maintenance_plans
    ADD CONSTRAINT maintenance_plans_pkey PRIMARY KEY (id);


--
-- Name: pages pages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: pages pages_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_slug_unique UNIQUE (slug);


--
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (id);


--
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);


--
-- Name: seo_metadata seo_metadata_path_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seo_metadata
    ADD CONSTRAINT seo_metadata_path_key UNIQUE (path);


--
-- Name: seo_metadata seo_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seo_metadata
    ADD CONSTRAINT seo_metadata_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_key_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_key_unique UNIQUE (key);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: topic_clusters topic_clusters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_clusters
    ADD CONSTRAINT topic_clusters_pkey PRIMARY KEY (id);


--
-- Name: topic_clusters topic_clusters_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_clusters
    ADD CONSTRAINT topic_clusters_slug_key UNIQUE (slug);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: vehicles vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (id);


--
-- Name: vehicles vehicles_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_slug_unique UNIQUE (slug);


--
-- Name: idx_editorial_published; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_editorial_published ON public.editorial_content USING btree (published);


--
-- Name: idx_editorial_published_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_editorial_published_at ON public.editorial_content USING btree (published_at DESC);


--
-- Name: idx_editorial_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_editorial_type ON public.editorial_content USING btree (type);


--
-- PostgreSQL database dump complete
--



