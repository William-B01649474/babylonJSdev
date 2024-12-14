import { AdvancedDynamicTexture, Button, Rectangle, Grid, TextBlock, InputText, Control } from "@babylonjs/gui";

// Function to create GUI from JSON
export function createGUIFromJSON(jsonData: any, scene: any): AdvancedDynamicTexture {
    const uiTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    function createElement(data: any, parent: any): void {
        let element;

        switch (data.className) {
            case "Rectangle":
                element = new Rectangle(data.name || "rectangle");
                element.background = data.background || "";
                element.width = data.width;
                element.height = data.height;
                element.cornerRadius = data.cornerRadius || 0;
                element.thickness = data.thickness || 0;
                break;
            case "Button":
                element = Button.CreateSimpleButton(data.name || "button", data.text || "");
                element.background = data.background || "#000000";
                element.color = data.color || "white";
                element.width = data.width;
                element.height = data.height;
                break;
            case "Grid":
                element = new Grid(data.name || "grid");
                if (data.columns) {
                    data.columns.forEach((col: any, index: number) => {
                        element.addColumnDefinition(col.value);
                    });
                }
                if (data.rows) {
                    data.rows.forEach((row: any, index: number) => {
                        element.addRowDefinition(row.value);
                    });
                }
                break;
            case "TextBlock":
                element = new TextBlock(data.name || "textblock", data.text || "");
                element.color = data.color || "white";
                element.fontSize = data.fontSize || 20;
                break;
            case "InputText":
                element = new InputText(data.name || "inputtext");
                element.text = data.text || "";
                element.width = data.width;
                element.height = data.height;
                element.background = data.background || "#333333";
                element.color = data.color || "white";
                break;
            default:
                console.warn("Unknown GUI element class:", data.className);
        }

        if (element) {
            element.horizontalAlignment = data.horizontalAlignment || Control.HORIZONTAL_ALIGNMENT_CENTER;
            element.verticalAlignment = data.verticalAlignment || Control.VERTICAL_ALIGNMENT_CENTER;

            if (parent) {
                if (parent instanceof Grid && data.metadata?._cellInfo) {
                    const cellInfo = data.metadata._cellInfo;
                    parent.addControl(element, cellInfo.row, cellInfo.column);
                } else {
                    parent.addControl(element);
                }
            } else {
                uiTexture.addControl(element);
            }

            if (data.children && data.children.length > 0) {
                data.children.forEach((child: any) => createElement(child, element));
            }
        }
    }

    createElement(jsonData.root, null);
    return uiTexture;
}
