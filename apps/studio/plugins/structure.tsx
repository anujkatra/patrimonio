import { ConfigContext } from "sanity";
import { ListBuilder, StructureBuilder } from "sanity/structure";
import { singletons } from "../schemaTypes/singletons";


export const structure: (
    S: StructureBuilder,
    context: ConfigContext
  ) => Promise<ListBuilder> = async (S, context) => {
    const singletonItems = singletons.map((typeDef) => {
      return S.listItem()
        .title(typeDef['title']!)
        .icon(typeDef['icon'])
        .child(
          S.editor()
            .id(typeDef['type'])
            .schemaType(typeDef['name'])
            .documentId(typeDef['name'])
        );
    });
  
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !singletons.find((singleton) => singleton['name'] === listItem.getId())
    );
  
    return S.list()
      .title("Content")
      .items([
        ...singletonItems,
        S.divider(),
        ...defaultListItems  
      ]);
  };