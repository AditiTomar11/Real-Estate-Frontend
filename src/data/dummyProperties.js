// Static stand-in for the backend property list.
// Replace with propertyApi.getProperties() once the backend is wired up.

const dummyProperties = [
  {
    id: 1,
    title: 'Ashoka Residency 3BHK',
    city: 'Noida',
    locality: 'Sector 77',
    type: 'RESIDENTIAL',
    bhk: 3,
    price: 9500000,
    areaSqft: 1650,
    status: 'AVAILABLE',
    description:
      'Ready-to-move 3BHK apartment on the 9th floor with an east-facing balcony, modular kitchen, and covered parking. Close to the metro corridor and Sector 76 market.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
    ],
  },
  {
    id: 2,
    title: 'Green Meadows Farmhouse Plot',
    city: 'Noida',
    locality: 'Noida Expressway',
    type: 'RESIDENTIAL',
    bhk: 0,
    price: 14200000,
    areaSqft: 3200,
    status: 'AVAILABLE',
    description:
      'Freehold farmhouse plot with registry and mutation clear. Boundary wall complete, gated society with 24x7 security and a clubhouse.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200',
    ],
  },
  {
    id: 3,
    title: 'Kalpataru Heights 4BHK',
    city: 'Mumbai',
    locality: 'Goregaon West',
    type: 'RESIDENTIAL',
    bhk: 4,
    price: 32000000,
    areaSqft: 2100,
    status: 'AVAILABLE',
    description:
      'High-floor 4BHK with a private deck, sea-facing living room, and access to a rooftop infinity pool. Two dedicated parking slots.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200',
    ],
  },
  {
    id: 4,
    title: 'Cyber Hub Business Suite',
    city: 'Gurgaon',
    locality: 'DLF Cyber City',
    type: 'COMMERCIAL',
    bhk: 0,
    price: 18500000,
    areaSqft: 950,
    status: 'AVAILABLE',
    description:
      'Fitted office suite in a Grade-A tower, plug-and-play with raised flooring and central AC. Walking distance to the metro station.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
    ],
  },
  {
    id: 5,
    title: 'Riverside Residency 2BHK',
    city: 'Pune',
    locality: 'Kharadi',
    type: 'RESIDENTIAL',
    bhk: 2,
    price: 6800000,
    areaSqft: 1080,
    status: 'AVAILABLE',
    description:
      'Compact 2BHK in a well-maintained society with a garden view. Close to IT parks along the Kharadi bypass.',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200',
    ],
  },
  {
    id: 6,
    title: 'Whitefield Tech Park Office',
    city: 'Bangalore',
    locality: 'Whitefield',
    type: 'COMMERCIAL',
    bhk: 0,
    price: 24500000,
    areaSqft: 1400,
    status: 'AVAILABLE',
    description:
      'Independent floor office space with private entrance, cafeteria access, and 40 dedicated parking bays in the basement.',
    images: [
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200',
    ],
  },
  {
    id: 7,
    title: 'Sunrise Enclave 3BHK',
    city: 'Noida',
    locality: 'Sector 137',
    type: 'RESIDENTIAL',
    bhk: 3,
    price: 8200000,
    areaSqft: 1450,
    status: 'SOLD',
    description:
      'Corner unit with dual balconies, close to the Noida-Greater Noida Expressway exit. Society has a dedicated kids play area.',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200',
    ],
  },
  {
    id: 8,
    title: 'Lakeview Villa Plot',
    city: 'Pune',
    locality: 'Lavasa',
    type: 'RESIDENTIAL',
    bhk: 0,
    price: 11000000,
    areaSqft: 2400,
    status: 'AVAILABLE',
    description:
      'Hillside plot overlooking the lake, approved for independent villa construction. Water and electricity connections available at the boundary.',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
    ],
  },
];

export default dummyProperties;

export const CITIES = [...new Set(dummyProperties.map((p) => p.city))];
export const PROPERTY_TYPES = ['RESIDENTIAL', 'COMMERCIAL'];
export const BHK_OPTIONS = [1, 2, 3, 4];
