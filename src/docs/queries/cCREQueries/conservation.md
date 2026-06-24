# Get Conservation data

<p style="color: #ff0000; font-size: 1rem; font-weight: 700;">
  NOTE: You can also find orthogolous cCREs to download in other section of 
  <a href="https://screen.wenglab.org/downloads" target="_blank" rel="noopener noreferrer" style="color: #0969da; text-decoration: underline;">https://screen.wenglab.org/downloads</a>
</p>


## Get orthologous cCREs in another assembly

Returns orthogolous cCREs in mm10 for a given grch38 cCRE or vice versa.


```graphql
  query {
    orthologQuery(accession: ["EH38E2941922"], assembly: "grch38") {
      assembly
      accession
      ortholog {
        stop
        start
        chromosome
        accession
      }
    }
  }

```


## Get conservation scores for given cCRE

Returns conservation scores for given cCRE.

```graphql
  query {
  getcCREConservationDataQuery(accession: ["EH38E3314260"]) {
    primates_43_phylop
    mammals_241_phylop
    vertebrates_100_phylop
    primates_43_phastcons
    vertebrates_100_phastcons
    mammals_241_phastcons   
  }
}

```