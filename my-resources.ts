import * as pulumi from "@pulumi/pulumi";
import * as insights from "@pulumi/azure-nextgen/insights/v20150501";
import * as storage from "@pulumi/azure-nextgen/storage/latest";
import { Input } from "@pulumi/pulumi";

export class MyResourcesGroup extends pulumi.ComponentResource {
  constructor(
    name: string,
    args: { groupName: Input<string> },
    opts: pulumi.ComponentResourceOptions = {}
  ) {
    super("custom:azure:MyResourcesGroup", name, {}, opts);

    const storageAccount = new storage.StorageAccount(
      "mysa",
      {
        accountName: `mysaxyz`,
        location: "WestUS",
        resourceGroupName: args.groupName,
        sku: {
          name: storage.SkuName.Standard_LRS,
        },
        kind: storage.Kind.StorageV2,
      },
      { parent: this }
    );

    const myInsights = new MyInsights("myinsights", args, { parent: this });
  }
}

class MyInsights extends pulumi.ComponentResource {
  constructor(
    name: string,
    args: { groupName: Input<string> },
    opts: pulumi.ComponentResourceOptions = {}
  ) {
    super("custom:azure:MyInsights", name, {}, opts);

    const insightsComponent = new insights.Component(
      `myinsights`,
      {
        resourceName: `myinsightsxyz`,
        applicationType: insights.ApplicationType.Web,
        flowType: insights.FlowType.Bluefield,
        kind: "java",
        location: "WestUS",
        resourceGroupName: args.groupName,
        requestSource: "rest",
        retentionInDays: 30,
      },
      { parent: this }
    );
  }
}
