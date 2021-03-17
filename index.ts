import * as resources from "@pulumi/azure-nextgen/resources/latest";
import { MyResourcesGroup } from "./my-resources";

const suffix = "wxyz";

const resourceGroup = new resources.ResourceGroup(`rg${suffix}`, {
  resourceGroupName: `rg${suffix}`,
  location: "WestUS",
});

const myResourcesGroup = new MyResourcesGroup(
  "myresources",
  {
    groupName: resourceGroup.name,
  },
  { parent: resourceGroup }
);
