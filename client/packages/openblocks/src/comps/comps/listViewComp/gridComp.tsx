import { withPropertyViewFn } from "comps/generators";
import { NameGenerator } from "comps/utils";
import { toSimpleContainerData } from "../containerBase/simpleContainerComp";
import { ListViewComp } from "./listViewComp";
import { listPropertyView } from "./listViewPropertyView";

let GridTmpComp = ListViewComp;

const GridPropertyView = listPropertyView("grid");
GridTmpComp = withPropertyViewFn(GridTmpComp, (comp) => {
  return <GridPropertyView comp={comp} />;
});

export const GridComp = GridTmpComp;

export function defaultGridData(compName: string, nameGenerator: NameGenerator) {
  return {
    noOfRows:
      '[\n  {\n    "rate": "9.2",\n    "title": "The Shawshank Redemption",\n    "url": "https://www.imdb.com/title/tt0111161/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "9.2",\n    "title": "The Godfather",\n    "url": "https://www.imdb.com/title/tt0068646/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "9.0",\n    "title": "The Dark Knight",\n    "url": "https://www.imdb.com/title/tt0468569/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UY67_CR0,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "9.0",\n    "title": "The Godfather Part II",\n    "url": "https://www.imdb.com/title/tt0071562/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "9.0",\n    "title": "12 Angry Men",\n    "url": "https://www.imdb.com/title/tt0050083/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX45_CR0,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "8.9",\n    "title": "Schindler\'s List",\n    "url": "https://www.imdb.com/title/tt0108052/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX45_CR0,0,45,67_AL_.jpg"\n  }\n]',
    noOfColumns: "3",
    container: toSimpleContainerData([
      {
        item: {
          compType: "image",
          name: nameGenerator.genItemName("image"),
          comp: {
            src: "{{currentItem.cover}}",
            autoHeight: "fixed",
          },
        },
        layoutItem: {
          i: "",
          w: 7,
          h: 14,
          x: 0,
          y: 0,
        },
      },
      {
        item: {
          compType: "link",
          name: nameGenerator.genItemName("link"),
          comp: {
            text: "{{i+1}}. {{currentItem.title}}",
            onEvent: [
              {
                name: "click",
                handler: {
                  compType: "goToURL",
                  comp: {
                    url: "{{currentItem.url}}",
                    inNewTab: true,
                  },
                  condition: "",
                  slowdown: "debounce",
                  delay: "",
                },
              },
            ],
          },
        },
        layoutItem: {
          i: "",
          h: 5,
          w: 17,
          x: 7,
          y: 0,
        },
      },
      {
        item: {
          compType: "rating",
          name: nameGenerator.genItemName("rating"),
          comp: {
            value: "{{currentItem.rate / 2}}",
            max: "5",
            label: {
              text: "",
              width: "33",
              widthUnit: "%",
              position: "row",
              align: "right",
            },
            allowHalf: true,
            disabled: true,
          },
        },
        layoutItem: {
          i: "",
          h: 5,
          w: 17,
          x: 7,
          y: 9,
        },
      },
    ]),
  };
}
