# Getting gene expression data

## Query matching genes starting with give name prefix  

Returns gene names matching given name prefix along with genomic region.

Due to performance limitations, its recommended to use limit input parameter with these autocomplete queries

```graphql
query {
    gene(assembly: "grch38", name_prefix: "so", limit: 3) {
      name
      id
      coordinates {
        start
        chromosome
        end
      }
    }
  }  
 
```
## Get gene details along with transcripts for a given gene

Returns gene details data for the SOX4 gene. Version indicates gencode 40 version.

```graphql
query Gene {
  gene(assembly: "GRCh38", version: 40, name: "SOX4") {
    name
    id
    strand
    gene_type
    coordinates {
      chromosome
      end
      start
    }
    transcripts {
      coordinates {
        chromosome
        end
        start
      }
      id
      name
      strand
    }
  }
}
```

## Get gene details along with transcripts for a all genes within given genomic region

```graphql
 query  {
    gene(assembly:"grch38", range: [{chromosome: "chr19",start: 40352832, stop:40362832}], version: 40) {
      name
      id
      strand
      gene_type
      coordinates {
        chromosome
        end
        start
      }
      transcripts {
        coordinates {
          chromosome
          end
          start
        }
        id
        name
        strand
      }
    }
  }
```

## Get gene expression for all biosamples for a given gene

Returns gene expression data for the SOX4 gene (based on gene id). Please use geneid without version (part before .) as input.

```graphql
query  {
  gene_dataset(processed_assembly: "GRCh38") {
    biosample
    tissue
    biosample_type
    assay_term_name
    exp_accession: accession
    replicates: gene_quantification_files(assembly: "GRCh38") {
      file_accession: accession
      biorep
      techrep
      quantification: quantifications(gene_id_prefix: ["ENSG00000124766"]) {
        tpm
      }
    }
  }
}
```
<br />
