const mongoose = require('mongoose');

// Define schemas for subdocuments
const HeroContentSchema = new mongoose.Schema({
  badge: { type: String, default: 'Trusted Tour Agency from Kerala' },
  headline1: { type: String, default: 'Explore More,' },
  headline2: { type: String, default: 'Create Memories' },
  subtext: {
    {
      type: String,
      default:
        'Corporate, Student, Family & Honeymoon Trips Across India — curated with care from Palakkad & Thrissur, Kerala.',
    },
  stats: {
    type: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
    default: [
      { value: '10K+', label: 'Happy Travellers' },
      { value: '250+', label: 'Tours Curated' },
      { value: '50+', label: 'Destinations' },
      { value: '10+', label: 'Years Experience' },
    ],
  },
});

const ServiceItemSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  icon: { type: String },
});

const DestinationItemSchema = new mongoose.Schema({
  name: { type: String },
  tag: { type: String },
  imgKey: { type: String },
});

const PackageItemSchema = new mongoose.Schema({
  name: { type: String },
  location: { type: String },
  days: { type: String },
  price: { type: Number },
  imgKey: { type: String },
  inclusions: { type: [String] },
  badge: { type: String },
});

const WhyUsItemSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  icon: { type: String },
});

const TestimonialItemSchema = new mongoose.Schema({
  name: { type: String },
  city: { type: String },
  tripType: { type: String },
  quote: { type: String },
});

const GalleryItemSchema = new mongoose.Schema({
  imgKey: { type: String },
  rowSpan: { type: Number, default: 1 },
});

const SiteMetaSchema = new mongoose.Schema({
  siteTitle: { type: String, default: 'Gokulam Holidays — Tour Packages Across India' },
  siteDescription: {
    type: String,
    default:
      'Premium tour packages from Palakkad & Thrissur, Kerala. Corporate, student, family & honeymoon trips across India and beyond.',
  },
  aboutMission: {
    type: String,
    default:
      'Make travel effortless, affordable and unforgettable for every Indian family and group.',
  },
  aboutVision: {
    type: String,
    default:
      "Be Kerala's most trusted tour partner — known for warmth, honesty and curated experiences.",
  },
  aboutRating: { type: String, default: '4.9 / 5' },
  aboutRatingLabel: {
    {
      type: String,
      default: 'Rated by 1,200+ travellers across India.',
    },
  footerTagline: {
    type: String,
    default:
      'Crafting memorable journeys from Palakkad & Thrissur, Kerala — across India and beyond.',
  },
});

const SiteContactSchema = new mongoose.Schema({
  phone: { type: String, default: '+917559846476' },
  phoneDisplay: { type: String, default: '+91 75598 46476' },
  whatsapp: { type: String, default: 'https://wa.me/917559846476' },
  instagram: { type: String, default: 'https://instagram.com/gokulam__thulasidas' },
  location: { type: String, default: 'Palakkad & Thrissur, Kerala' },
  email: { type: String, default: 'info@gokulamholidays.com' },
});

const SiteDataSchema = new mongoose.Schema(
  {
    contact: SiteContactSchema,
    hero: HeroContentSchema,
    services: [ServiceItemSchema],
    destinations: [DestinationItemSchema],
    packages: [PackageItemSchema],
    whyUs: [WhyUsItemSchema],
    testimonials: [TestimonialItemSchema],
    meta: SiteMetaSchema,
    gallery: [GalleryItemSchema],
  },
  { timestamps: true },
);

const SiteData = mongoose.model('SiteData', SiteDataSchema);
module.exports = SiteData;
