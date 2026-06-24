
# Get cCRE Gene links

<p style="color: #ff0000; font-size: 1rem; font-weight: 700;">
  NOTE: You can also find cCRE-Gene link files to download in cCRE-Gene Links section of 
  <a href="https://screen.wenglab.org/downloads" target="_blank" rel="noopener noreferrer" style="color: #0969da; text-decoration: underline;">https://screen.wenglab.org/downloads</a>
</p>


## Get Near by genes from given cCREs

Returns 3 nearest by genes for a cCRE by distance.
  
```graphql 
 query {
  getmaxZScoresQuery(assembly: "grch38", accession: ["EH38E1310345"]) {
    accession
    chromosome   
    start    
    stop
    ccre_group  
    nearestgenes {
      distance
      gene
    }

  }
}
```

## Get linked genes

Returns Intact-HiC linked genes if assay is Intact-HiC, ChIAPET linked genes if assay is RNAPII-ChIAPET or CTCF-ChIAPET, CRISPR linked genes if method is CRISPR and lastly eQTLs genes if method is eQTLs

This data is only available for Human

```graphql

query {
  linkedGenesQuery(assembly: "grch38", accession: ["EH38E1516972"]) {
      accession  
      p_val
      gene
      geneid
      genetype
      method
      grnaid
      effectsize
      assay
      celltype
      experiment_accession
      tissue
      variantid
      source
      slope
      score
      displayname
    }
}
```


## Get Computational linked genes

Returns linked genes for a cCRE by various methods like ABC_(DNase_only),ABC_(full), EPIraction,GraphRegLR,rE2G_(DNase_only) and rE2G_(extended).

This data is only available for Human
  
```graphql
 query {
    ComputationalGeneLinksQuery(accession: ["EH38E1516972"], method: ["ABC_(full)"]){
      genename
      accession
      geneid
      genetype
      method
      celltype
      score
      methodregion
      fileaccession
    }
  }
```

