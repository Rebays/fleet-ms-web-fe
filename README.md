## FMIS - Web App

dev/testing environment: test.fmis.rebays.com.sb

staging environment: staging.fmis.rebays.com.sb

prod environment: fmis.rebays.com.sb

## Example Directory Structure

features/assets/
├── api/                    # Data Layer
│   ├── queries.graphql     # GetAssets, GetAssetDetails
│   ├── mutations.graphql   # CreateAsset, UpdateAssetStatus
│   └── fragments.graphql   # Shared fields (e.g., AssetCoreFields)
│
├── components/             # UI Layer
│   ├── AssetList/          # The main data table/grid
│   ├── AssetForm/          # Create/Edit asset wizard
│   ├── StatusBadge.tsx     # Color-coded status (Active, Maintenance, Out of Service)
│   └── VehicleSpecs.tsx    # Technical details display
│
├── hooks/                  # Logic Layer
│   ├── useAssetTable.ts    # Handling sorting/filtering logic
│   └── useAssetActions.ts  # Wrappers for GQL mutations (delete, decommission)
│
├── types/                  # Domain Types
│   └── index.ts            # Enums for FuelType, AssetType, etc.
│
└── utils/                  # Helper Functions
    └── vinValidator.ts     # VIN checksum logic