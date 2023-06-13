import "./App.css";
import {
  Excalidraw,
  MainMenu,
  WelcomeScreen,
  loadFromBlob,
} from "@excalidraw/excalidraw";
import useDropboxChooser from "use-dropbox-chooser";
import React from "react";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

function App() {
  const { open } = useDropboxChooser({
    appKey: "81braykdvzmr4gq",
    chooserOptions: { linkType: "direct", extensions: [".excalidraw"] },
    onSelected: (files) => {
      console.log(files);
    },
  });

  const excalidrawRef = React.useRef<ExcalidrawImperativeAPI>(null);

  return (
    <Excalidraw ref={excalidrawRef} viewModeEnabled>
      <MainMenu>
        <MainMenu.Item
          onSelect={async () => {
            try {
              const selected = await open();
              const blob = await fetch(selected[0].link).then((r) => r.blob());

              const data = await loadFromBlob(
                blob,
                excalidrawRef.current!.getAppState(),
                null
              );

              excalidrawRef.current!.updateScene({
                elements: data.elements,
                appState: data.appState,
              });
              excalidrawRef.current!.scrollToContent();
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Open from Dropbox
        </MainMenu.Item>
        <MainMenu.DefaultItems.LoadScene />
        <MainMenu.DefaultItems.Export />
        <MainMenu.DefaultItems.SaveAsImage />
        <MainMenu.DefaultItems.Help />
        <MainMenu.DefaultItems.ClearCanvas />
        <MainMenu.Separator />
      </MainMenu>
      <WelcomeScreen />
    </Excalidraw>
  );
}

export default App;
