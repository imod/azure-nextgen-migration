# azure-nextgen-migration

example project showing pulumi migration problems

this project is setup with pulumi azure nextgen:

    "@pulumi/azure-nextgen": "^0.4.0"
    "@pulumi/pulumi": "^2.17.2"

running `pulumi up` will create the following stack:

```
Current stack is dev:
    Owner: imod
    Last updated: 11 seconds ago (2021-03-18 00:01:23.736431 +0100 CET)
    Pulumi version: v2.17.2
Current stack resources (7):
    TYPE                                                            NAME
    pulumi:pulumi:Stack                                             azure-nextgen-migration-dev
    ├─ azure-nextgen:resources/latest:ResourceGroup                 rgwxyz
    │  └─ custom:azure:MyResourcesGroup                             myresources
    │     ├─ custom:azure:MyInsights                                myinsights
    │     │  └─ azure-nextgen:insights/v20150501:Component          myinsights
    │     └─ azure-nextgen:storage/latest:StorageAccount            mysa
    └─ pulumi:providers:azure-nextgen                               default_0_4_0
```

Updating the project to:

    "@pulumi/azure-native": "^0.7.1"
    "@pulumi/pulumi": "^2.22.0"
    
will show the following update preview:

```
Previewing update (dev)

View Live: https://app.pulumi.com/imod/azure-nextgen-migration/dev/previews/1717ba79-5635-440c-9ed3-f349d690a223

     Type                                                   Name                         Plan       Info
     pulumi:pulumi:Stack                                    azure-nextgen-migration-dev             2 war
     ├─ azure-native:resources/latest:ResourceGroup         rgwxyz                                  [
     │  └─ custom:azure:MyResourcesGroup                    myresources                            
 +   │     ├─ azure-native:storage/latest:StorageAccount    mysa                         create    
     │     └─ custom:azure:MyInsights                       myinsights                             
 +   │        └─ azure-native:insights/v20150501:Component  myinsights                   create    
 -   ├─ azure-nextgen:insights/v20150501:Component          myinsights                   delete     
 -   └─ azure-nextgen:storage/latest:StorageAccount         mysa                         delete   
```

As you can see, it wants to delete the all the resources which have a custom component as a parent.
