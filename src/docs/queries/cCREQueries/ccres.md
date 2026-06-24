# Getting cCRE details

<p style="color: #ff0000; font-size: 1rem; font-weight: 700;">
  NOTE: If you are looking for details for ALL cCREs, best choice is to download files at
  <a href="https://screen.wenglab.org/downloads" target="_blank" rel="noopener noreferrer" style="color: #0969da; text-decoration: underline;">https://screen.wenglab.org/downloads</a>
</p>


## Query cCREs by genomic region 

Returns the cCREs in the given range, their location, and their group, max zscores for each of the assays.

```graphql
query {
  getmaxZScoresQuery(assembly: "grch38",
  coordinates:[{start: 1000000,end: 1001000,chromosome: "chr1"
  }]) {
    accession
    chromosome   
    start    
    stop
    ccre_group    
    atac_max_zscore
    ctcf_max_zscore
    dnase_max_zscore
    h3k27ac_max_zscore
    h3k4me3_max_zscore
  }
}

```

## Query cCREs by list of accession

Returns the cCREs in the given range, their location, and their group, max zscores for each of the assays.

```graphql
query {
  getmaxZScoresQuery(assembly: "grch38", accession: ["EH38E1310345"]) {
    accession
    chromosome   
    start    
    stop
    ccre_group    
    atac_max_zscore
    ctcf_max_zscore
    dnase_max_zscore
    h3k27ac_max_zscore
    h3k4me3_max_zscore
  }
}
```

## Query cCREs by genomic region for biosample-specific epigenetic signal

Returns Astrocyte specific zscores for cCREs in given region
Format of zscores is [[experiment_accession, file_accession, assay, biosample_value, biosample_name, organ/tissue, sampletype, lifestage, zscore_value ]]

```graphql
query {
  getcCREZScoresQuery(assembly: "grch38", coordinates: [ {
     start: 1000000,
     end: 1000100,
     chromosome: "chr1"
  }], biosample_value: ["astrocyte_ENCDO336AAA"],  include_biosample_details: true) {
    chromosome
    start
    stop
    accession
    atac_max_zscore
    ctcf_max_zscore
    dnase_max_zscore
    h3k27ac_max_zscore
    h3k4me3_max_zscore
    zscores   
  }
}

```
## Query cCREs by accession for biosample-specific epigenetic signal

Returns Astrocyte specific zscores for a given cCRE
Format of zscores is [[experiment_accession, file_accession, assay, biosample_value, biosample_name, organ/tissue, sampletype, lifestage, zscore_value ]]

```graphql
query {
  getcCREZScoresQuery(assembly: "grch38",accession: ["EH38E1310345"], biosample_value: ["astrocyte_ENCDO336AAA"],  include_biosample_details: true) {
    chromosome
    start
    stop
    accession
    atac_max_zscore
    ctcf_max_zscore
    dnase_max_zscore
    h3k27ac_max_zscore
    h3k4me3_max_zscore
    zscores   
  }
}
```



## Get Biosample Metadata for given assembly

Returns biosample metadata including short display name, value, ontology, life stage, sample type along with file and experiment accessions for corresponding assays for a given assembly (grch38 or mm10)

```graphql

query {
    ccREBiosampleQuery(assembly: "grch38") {
      biosamples {
        name
        ontology        
        lifeStage
        sampleType
        displayname
        dnase: experimentAccession(assay: "DNase")
        h3k4me3: experimentAccession(assay: "H3K4me3")
        h3k27ac: experimentAccession(assay: "H3K27ac")
        ctcf: experimentAccession(assay: "CTCF")
        atac: experimentAccession(assay: "ATAC")
        dnase_signal: fileAccession(assay: "DNase")
        h3k4me3_signal: fileAccession(assay: "H3K4me3")
        h3k27ac_signal: fileAccession(assay: "H3K27ac")
        ctcf_signal: fileAccession(assay: "CTCF")
        atac_signal: fileAccession(assay: "ATAC")
      }
    }
  } 

```


## Query matching cCRE accessions starting with give name prefix  

Returns cCRE accessions matching given name prefix along with genomic region.

Due to performance limitations, its recommended to use limit input parameter with these autocomplete queries.

```graphql

  query  {
    cCREAutocompleteQuery(
      assembly: "GRCh38",
      limit: 3,
      accession_prefix: ["EH38E331426"],
    ) {
      accession
      coordinates {
        chromosome
        start
        end
      }
    }
  }


```

## Query a max Z scores of a cCRE 

<p style="color: #ff0000; font-size: 1rem; font-weight: 700;">
NOTE: If you are looking for max z-scores for ALL cCREs best choice is to download zscore files at  <a href="https://screen.wenglab.org/downloads" target="_blank" rel="noopener noreferrer" style="color: #0969da; text-decoration: underline;">https://screen.wenglab.org/downloads</a> (Data Matrices tab)
</p>

Returns a cell type agnostic max Z scores of a cCRE 

```graphql
query {
  getmaxZScoresQuery(assembly: "grch38", accession: ["EH38E1310345"]) {
    accession
    chromosome   
    start    
    stop
    ccre_group    
    atac_max_zscore
    ctcf_max_zscore
    dnase_max_zscore
    h3k27ac_max_zscore
    h3k4me3_max_zscore
  }
}

```

## Get biosample-specific epigenetic signals

<p style="color: #ff0000; font-size: 1rem; font-weight: 700;">
NOTE: If you are looking for cell type specific z-scores for ALL cCREs best choice is to download zscore files at  <a href="https://screen.wenglab.org/downloads" target="_blank" rel="noopener noreferrer" style="color: #0969da; text-decoration: underline;">https://screen.wenglab.org/downloads</a> (Data Matrices tab)
</p>


Returns all biosample-specific signals for a given cCRE.
Format of zscores is [[experiment_accession, file_accession, assay, biosample_value, biosample_name, organ/tissue, sampletype, lifestage, zscore_value ]]

```graphql
query {
  getcCREZScoresQuery(assembly: "grch38",accession: ["EH38E1310345"],  include_biosample_details: true) {
    chromosome
    start
    stop
    accession
    atac_max_zscore
    ctcf_max_zscore
    dnase_max_zscore
    h3k27ac_max_zscore
    h3k4me3_max_zscore
    zscores   
  }
}
```


## Get Silencers data
Returns silencer studies

```graphql
query {
  silencersQuery(accession: ["EH38E3314260"]) {
    silencer_studies    
  }
}

```

## Get Dynamic Enhancers for given cCRE

Returns Dynamic Enhancers

```graphql
query {
  dynamicEnhancersQuery(accession: ["EH38E3314260"]) {
    celltype
    accession    
  }
}
```

<br />

