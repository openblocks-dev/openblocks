import { SERVER_HOST } from "../constants/apiConstants";

export const buildMaterialPreviewURL = (id: string) =>
  `${SERVER_HOST}/api/materials/${id}?type=preview`;
