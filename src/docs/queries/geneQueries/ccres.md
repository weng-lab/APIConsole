# Getting linked cCREs for given gene

<p style="color: #ff0000; font-size: 1rem; font-weight: 700;">
  NOTE: You can also find cCRE-Gene link files to download in cCRE-Gene Links section of 
  <a href="https://screen.wenglab.org/downloads" target="_blank" rel="noopener noreferrer" style="color: #0969da; text-decoration: underline;">https://screen.wenglab.org/downloads</a>
</p>


## Get promoter cCREs for a given gene id
This data is only available for Human

```graphql
query  {
  genePromoterQuery(geneid: ["ENSG00000124766"]) {
    chromosome
    stop
    start
    ccre_group
    accession
  }
}
```

## Get linked cCREs for a given gene id
Returns Intact-HiC linked cCREs if assay is Intact-HiC, ChIAPET linked cCREs if assay is RNAPII-ChIAPET or CTCF-ChIAPET, CRISPR linked cCREs if method is CRISPR and lastly eQTLs cCREs if method is eQTLs

This data is only available for Human

```graphql
query  {
  linkedcCREs: linkedcCREsQuery(assembly: "grch38", geneid: ["ENSG00000124766"]) {
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

## Get Computational cCRE links for a given gene
Returns Computational cCRE links for methods like ABC_(DNase_only), ABC_(full), EPIraction, GraphRegLR, rE2G_(DNase_only) and rE2G_(extended)

This data is only available for Human

```graphql
query {
  ComputationalCcreLinksQuery(geneid: ["ENSG00000124766"], method: ["rE2G_(DNase_only)"]) {
    genename
    accession
    geneid
    genetype
    method
    celltype
    score
    methodregion
    fileaccession
    accession
  }
}
```