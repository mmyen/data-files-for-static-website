// sticky nav bar
window.onscroll = function () { myFunction() };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

// scroll to top of page when load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

////////
// the content, rendering, and pagination
////////

// https://www.coderstool.com/json-sort
// https://www.convertcsv.com/json-to-csv.htm
// https://www.convertcsv.com/transpose-csv.htm

// wordContent is the Instagram post IDs for all the campuses together
var wordContent = 
[

		'CuVBU_ip5lG','CuU9XRbgPxR','CuUvYAQgN6g','CuUozJhycp-','CuStVtcPPua','CuSK0JsPMbB','CuSGYaDAak6','CuR9Rp8Oe1K','CuQpTImrvNq','CuQlwv0rSa4',
		'CuQRSfbvKTl','CuQHbzaLkUP','CuP6DkJSamQ','CuPzcv1pcBJ','CuPq_f1PwOs','CuPqmxkvUXg','CuPkL-VvDe6','CuOO6WMOOp5','CuOD-3troS8','CuN5CYGJXT6',
		'CuN1SRgJJ9_','CuNoyH4PVQB','CuNkprlPf3F','CuNa98GOfJf','CuNZlWvyEd_','CuNDkR-pOEq','CuM1h9vMj40','CuLr0ZGrXLP','CuLheB4r4bt','CuLbFqmLMxm',
		'CuLAszyPC4d','CuKvSXRvvba','CuKmwkyJz1t','CuIxR4qpVAw','CuIq90CRCbT','CuIXCMiv6Ny','CuIN2PiSBIr','CuIEZbbO_qN','CuIDSlCgifP','CuH6IKRvSvW',
		'CuF-4k5vd-I','CuF-TmTPa0w','CuF5ihMPKqR','CuFxz2hudVT','CuFtbrXyjlJ','CuFRe_eLXQy','CuDy1vYLsGi','CuDequYJQ09','CuDNYPgPw3C','CuC5a2tPYkB',
		'CuC5KaIPgkn','CuC4h1KvSMK','CuCur4KJzKE','CuBK5-frhGG','CuA_EBxJCFf','CuA-x5lJEtx','CuA4REvPFIR','CuAzT8svNZ5','CuAj9w8yRo9','CuAK1_FJpKE',
		'Ct-Sibiv6GP','Ct-UjKnP8K2','Ct-SPtJPEPh','Ct-SSYbP2PV','Ct-POgwPxyM','Ct93zPYyq-S','Ct9zjwyutaJ','Ct9xq_DPi4r','Ct9YHpBA0tP','Ct7017rx4R2',
		'Ct7zpuCJ19O','Ct5o4jvgWVw','Ct5c9ABr1dI','Ct48Yb3Pqip','Ct43x9QSmq5','Ct43swKym2h','Ct4zBk2SIn7','Ct4fwl-Rk15','Ct2riWUpDEK','Ct2b6x3P_of',
		'Ct2X5cDSoLY','Ct2VELzyil5','Ct2QRU3yv2_','Ct2OGujS7T4','Ct2GWW-vEuP','Ct2E-KLvcVt','Ct0Bd0qv50a','CtzmEIjSkhl','CtxpC7ULTEf','CtxoPGcLqi4',
		'CtxoBjvxyMD','Ctxm8GQrJPf','CtxQbbvvmA4','CtxO4rQJyXG','Ctw1VIXP7Vr','CtwyHsdvmmY','CtwuR31A1st','CtvYGjFrJSD','CtugGf8OX-b','CtuZJ2kvE94',
		'CtuMVG6v87v','Cts4qpmu07G','CtsgaZpL60n','Ctsd7IWrGzU','CtsInbDPp-M','Ctr9RSSSrDk','Ctr23PWO4iC','CtreEFopE7M','CtqDDaEr9PQ','CtpvsGVJ6S1',
		'CtppIiLPtrs','CtpkWXXvJ_m','Ctpd9ypSb10','CtpF9MFuQBY','Ctnd_COrtDb','CtnRX6SLsq9','Ctm9YjeveoP','CtmdnFUpYVP','CtmZBHEvgAx','CtlC3xDOo_J',
		'Ctkd49pvD_v','CtkNamfyBSF','CtkM4_lSdGB','CtkJO7nhtoa','CtkJKIfhQi1','CtkD_7CvaMo','Ctjm_H9Rrk2','CtiJEOULCrw','CthytzAP6gu','Cthyh1evNNQ',
		'CthomR0Sg32','CthdE1WvKIA','CthZDBRo9A9','CthM6aapTIt','Ctfm_lrRi8G','CtfmwJbxR8m','CtfhQDrxhth','CtfaEe-voSI','CtfV7lavZgg','Cte9zAhyE5e',
		'CteTPU2OvCG','CteSj0xrvLY','CtcjSNFS7B6','CtceMrPSety','CtcQskVPzCH','CtcIoTqpzeM','Ctbx6bcL_2q','CtamrOurDrt','CtaRE0kvyjj','CtaQ_uRP3FL',
		'CtZSoafL_On','CtYFfEerqE3','CtYBZQRr61N','CtYAOpProO0','CtXkcGtPVo8','CtXQXXlSs8f','CtW_KkJJuV4','CtU_7ypPUN_','CtS8l9kOAdJ','CtSUZvSNBcq',
		'CtSIbnZSsE3','CtSFjrdvFlf','CtR1Bd7vHom','CtRrBnCx41u','CtRgXH3gkIn','CtQoheRALl_','CtQUFbhLObh','CtQDcqgJier','CtP75ghSHfo','CtP5oytP4j_',
		'CtPzzG6vu1n','CtPs7ddSFQS','CtPoMtRSjVQ','CtPmXyYS-NO','CtPlzsYymXF','CtPgm8lSbqA','CtPWU4KvEvu','CtPV3ciPMZx','CtO5qcEL2E6','CtOFj2NsTND',
		'CtOBMXmrzLG','CtN4ipeL4r5','CtNky-5r9pi','CtNWrg-PZdR','CtNTrdfvBgG','CtNSeygP_pN','CtNPlDJvnhR','CtND1N0yOwx','CtM-3saSdr3','CtM8YDTMi6x',
		'CtM7tmxyEFy','CtM3EsWv-3m','CtM2a_7PN36','CtM03a_PafH','CtMoCh_RTzT','CtMfINpJtJy','CtLRiL5rAs7','CtLLe6GLWXv','CtK5muYpVfU','CtKdWBsyy5F',
		'CtKjdiHSXOP','CtKVpiSvdV5','CtKTsvwPVMm','CtKJMmPJjC2','CtIwLocOgua','CtIqjodOHlI','CtIMOdgv1HI','CtIMHBzvlmj','CtIEadlIj7A','CtIEokAPyqi',
		'CtH7s3kSmVl','CtH3z4cRH5G','CtH2SJ-yOk1','CtGNp5MOjlu','CtF8URRLAJk','CtFz7AwpUPQ','CtFulo-JLY0','CtFmTEzPvV1','CtFlqmHvgYx','CtFlMjSvegC',
		'CtFPFErg8j7','CtFL3lSSXdP','CtE8dtkOIRz','CtC3mmLyPIq','CtCckwMPZGv','CtA1kXxOWBN','CtAtCHWxYEF','CtABsR2P9SZ','CtAAztGOtQA','Cs__Fcqu6jG',
		'Cs_11uwpv_-','Cs_1QqmpvaU','Cs_olx3LAc3','Cs-q5PSOpMG','Cs-hZsuOGev','Cs-LB50LPhb','Cs-Ki9DLySZ','Cs-FiF-JLjV','Cs9xYHJviyx','Cs9wXluvsjZ',
		'Cs9tWIDPZvA','Cs9qpGPAebV','Cs9fr8HypNc','Cs9ZB89vZoS','Cs9W-nxvXGg','Cs9TEOJJrmb','Cs9RpMqJdeB','Cs9JrAOp2TC','Cs9B4bMrtqt','Cs79p6NrIzV',
		'Cs74AlTrmx-','Cs7ueoBrihZ','Cs7tga6rS2M','Cs7q67nrgI7','Cs7kKRux_qw','Cs7jxsMr39L','Cs7hMyupDn-','Cs7g-dmpKaL','Cs7gxyOJXQ1','Cs7d0bBJhtq',
		'Cs7arpfxfdt','Cs7Z_0wvz3j','Cs7UFKUP4er','Cs68espyVxu','Cs68C0iya0I','Cs616wLvrXg','Cs60q0WvIo3','Cs6poLgpZvW','Cs6f3_5pIj5','Cs6dTd0RD8U',
		'Cs5USZrOQoU','Cs5E9Qwr6aD','Cs4vollvjD3','Cs4XzHwyjvd','Cs4WTvmSId6','Cs4SJHOS-8o','Cs39L2aLaFG','Cs33MRZr00E','Cs31EVsryUh','Cs23vGwuLQl',
		'Cs2nZuXOQGo','Cs2dgbzL_Tn','Cs19w2Xvh4v','Cs19AjcvoHd','Cs14I3mS5hF','Cs1wnwav0ik','Cs1jU8Bp7WG','Cs1hItKJB2D','Cs0PQqVu8qL','Cs0C9lWLc-G',
		'CszsceUrxhp','CszRO5gv9dq','Csy5g7Up8iq','CsxgUZeOg3o','CswqZC1yx-f','CswbvZGAhUa','CsuzHAIgJaH','CsuvGb7LRFT','CsutTDUL5sV','CsutLpLrex6',
		'CsuVtmrvuvM','CsuLo7Uyc86','CsuGuqwSAly','CsuEuZTSrNJ','CsuCN13P_OR','CstzZKzpQlp','CstvOAzpECp','CstOw9MrJVx','Csrq0QCyyVD','CsrUlefAMLj',
		'CsrRcZSvui4','CsqISsZv8Am','Cspr_xgLLnO','Cspl168r3ju','CspG5blPNNj','CspD6XCPSeG','CsouvpPPdL8','CsosR5uPNcW','Csni2BiO1Wr','CsnEUn5rfFQ',
		'CsnBCYtRdE-','Csm4NSXxpup','CsmsChav_YN','Csmrr7gP_FF','CsmrITePGky','CsmptrdPTis','CsmlHluP_ja','CsmXAAiSjMp','CsmK6AiPKKQ','CsmIb_tPyev',
		'Csl_azevgFq','Csl-KiYxnYU','Csk3AQiOMKN','CskwIFXuf2I','CskH-4WPR3s','Csj1UYLyZ-G','CsjywERy65K','CsjyGjWxDzP','CsjhsEMP8Hn','CsiBkH-rt0j',
		'CsiAt8-r2iK','Cshj5tTPVSG','CshTl8QyX_1','CshH0wGPF-d','CsfRZL9rAPL','CsfHJcPvDPX','CscfyjPxBEW','CscSVV3vzpm','CscPV9kSZN4','CscEFjmSsAR',
		'CscDvjzy9Wo','CscDmSFyE_O','CscDMIJSJzE','CscBmieSfdv','CsaE-rXrwnB','CsZ-VZXRv95','CsZzHFDJmBe','CsXZdSgpPxW','CsXVUbNJSLG','CsXVBgXpe6S',
		'CsW6gw9SpO9','CsWsc9YPV7U','CsVGoSBurnc','CsU9cHArjdy','CsUvmtGPcbS','CsUSpNvv37w','CsTg95OOmTX','CsSVk_dLbXI','CsSQHp6JBNp','CsSERq1PpcW',
		'CsSDXcfvC4j','CsRh_QNveli','CsP_uv2r727','CsPomiKp0qd','CsMTk7nRcxt','CsMJg-TL6RS','CsKviDMLHlW','CsKd74lJm5M','CsKM39NBdeG','CsKM2g8PYpu',
		'CsJ55DCPIvv','CsJ1J_2rrAh','CsJxXimOidj','CsJtWfXxyG9','CsIax2hO_1T','CsH2poXpsmW','CsHwgNVv2zT','CsHt_29v8OO','CsHrooZPB-r','CsHZ4OgP2KS',
		'CsHWq9QPRHN','CsHPpwSvzDZ','CsF3sc0u3Dn','CsFl0nKrIdF','CsE3aycPSoa','CsEz-bmPZmb','CsEwsyxP1xH','CsCia2rPRMQ','CsCCIgePM5B','CsB4AfdR0qc',
		'CsBz8wjriSc','CsAuckSOmUV','CsAiLm2LYJ9','CsAbd-sLkUu','Cr_-slEP4le','Cr-97-NMIn0','Cr9lYBHvw2T','Cr9hZj3vstl','Cr9aeWQPyl7','Cr7h33oumtE',
		'Cr7PCkUr3xD','Cr4NuPcPHrk','Cr4KIE0StTv','Cr4JwTqPKiR','Cr3ghkFJGhz','Cr3O2ZqrdZs','Cr2A-tMrryi','Cr1_dQVLxZ0','Cr1x46ePllx','CrzF_-KvuQl',
		'CryynPXvNOK','CrwpfhCPvnc','CrwmIgyvr44','CrwcqmOB3FG','CrwJwOgvzTv','CrwCuMav2jB','CrwBq5avDpj','Crv3tuYOs0Z','Crusb85OCd3','Crt4w0NPDvo',
		'Crt0IjnS9wm','CrtNoipN1tr','CrrfuY-vtin','CrrV7u8PMAC','Crqr6ejN2bu','CromXEUM0Oy','CrofaolPt-1','CroRvPPtKl6','Crn2RdVtv84','CrmZeLWP6k5',
		'CrmN1MetBF-','CrkOjyqLT8_','CrkNe3JL7Yb','CrjjpnuPqD2','Crjiqy6ylM6','CrhricuLK0Y','Crhj8xPr69N','CrhQs7gPEMt','CrhQL-FPHpx','CrhGvAJvGoF',
		'CrfA1TsOvZc','Cre8zy8tgdN','Crew-dlLzpJ','CrenT_svW2e','CremkPVBVG0','CrehVjRP4yZ','CreMUdrSvcw','CreFWfwvPgA','Crd6OA4JnX3','Crdva7zLipw',
		'CrdrC8wLtCe','Crdp_gHrOY3','CrcjVo_LkZv','CrcVNF7x9aW','CrcEKeYvxJO','Crb9qXnvXQw','Crb7XPAPCBj','Crb6xE4vKk1','Crb20FVvNXS','Crbkh5ovWDt',
		'CrbkH1UOdCs','CrbQS7ghy-J','CrZXisnvNk9','CrZW2Dsv1Vh','CrZWm4HvGvt','CrZTkBvPLLl','CrZQL6FvNX2','CrWnEwCyG0P','CrUfigxpWxK','CrT96wQPLqD',
		'CrT8Kk3PzR2','CrPwF-puHt1','CrPCrNJPgwQ','CrO9GOIPY29','CrO8p1Ch6Ga','CrOr94gvbN-','CrOq1I8vLnY','CrNBJEJrEu7','CrMOpx1PYAD','CrMAf2OuHgP',
		'CrKGbMEvldP','CrJp3OSvAjw','CrJl7rqvCj4','CrG9Jupv4CG','CrFRGbPOGPH','CrEY9BpPSHa','CrEJZ9lJKW_','CrCegFtrQzh','CrCB9-NvDyN','CrBeR9HrvUM',
		'CrAR4h3IGDR','Cq_q_SVvVan','Cq_DNsMpP8Q','Cq8puYqPT57','Cq8Wwcdrj_k','Cq8LyuCr5Vk','Cq6pJXzvxQp','Cq4deR7u0GN','Cq3xyffvw28','Cq3wGsHvekj',
		'Cq3l2cxPpnG','Cq3U4E_JZo6','Cq1xVQULbOs','Cq1strZrDLH','Cq07ykDPrWE','Cq0rT25r19r','Cq0phZyLacZ','CqzgXZQOOti','CqzerCKuZBo','CqzeTLRuVs0',
		'CqzLIdoLTk2','CqwuLt-LhKx','CqvcgPAMW_f','CqvZ9CgrSih','Cqq7J-bPxEH','Cqq02xbvy1p','Cqp34KkscDH','CqoXO7vPAq7','CqoHB-jviYa','CqlrdfdPl46',
		'Cqlevn_PkaP','CqlRrNAJg1o','CqiKv3JLram','CqiAra1OOX5','CqeFGntv9h6','CqbXIPCvQD5','CqZEbUJvWms','CqVkRj8rlLD','CqVk5ejO-dm','CqVkSGPOK_S',
		'CqVjxAXOvpW','CqKCLbbuFDA','CqD8JW2vkK2','CqBMibLJs0L','Cp9P_JguysE','Cp0mQfuvdGf','CpvCJVsrXsv','CpnsRYuvQH3','Cpj02JwOs_n','CpinVkvPt56',
		'CpikviqvCSk','CpgO8qzPlkM','CpgOhvPPQWB','CpOnjLarSIP','CpLroviSKpT','CpEj92zLy55','CpEJc-fvqku','CpA9hM1PZeH','Co89C1lN6Ma','Co8I3e_S-Nz',
		'Co555fQp83G','Co5Vq8WJ-mo','Co3UknVv1Yf','CoqvH_PrNls','CopsDUhvATq','Con_-XLLnRG','CofxaJ2yeq6','CobD39iJ2wh','CoYcN6AP-tf','CoX3XEtvIhG',
		'CoVq_3xP6ig','CoVED6GPy4f','CoTT5VJvRqy','CoTae9pLvrt','CoTNAQtvnbp','CoTGJolPgzr','CoOaq8FL7wt','CoNQ0m3Jekk','CoI7yMxPpTT','CoFr3QBPJXq',
		'CoEgxFfLucP','CoEAMEhrkf7','Cn8oCUYOGlr','Cn7mgFNPJJ-','CnxIKfvvXUj','CnxB0BiJx39','Cnv0BjyOwn5','CnnMiIAvkD6','CnlaIrRLoPb','Cnk9yuvv-Nn',
		'CnaqVzPpn7A','Cm-dARgpkDL','CmxeRUxp7Ud','Clz_5XkLZSg','ClzOB97yNY3','ClnTUhVO-4t','ClnHKZqLdOu','Clm40MNpcWx','ClkK6omPbLr','ClhyU_4rW0J',
		'ClWa_YBpIh6','ClSXMn1Lojp','ClSWol7LXuK','ClRfvrpPuGm','ClMvVuMP-8l','ClF5YzJO38W','ClFLXh8Pgm9','ClCLY0Mvu0s','ClAdMuxuVCu','Ck9Q1Wiyru4',
		'CkwgsbUvhQB','CkwIVKYyeJK','CktYW7nPDzP','CkrDP2iPqV8','CkqyXNCP2NZ','CkoqvGpvsVt','CkhVjZaLDpb','Ckd-Emjvj9t','CkR2PzEJNFx','CkMYDT4P05F',
		'CkMOkjyS3Jh','CkKRpb1rxJ_','CkJWPOZyy6E','Cj60HL4rbu3','Cj6GXJyPE0i','Cj5_HuMvWhG','Cj3R1UwpY12','Cj2JbP0uO0j','Cj0sgBmpLk_','CjtgIRqPStT',
		'CjpM5lkOG-c','CjorOpSL3l7','CjoLXIJBjrF','CjmYC80OzrM','CjluuS_vuAT','CjikT5NJd-g','CjW_qfEgu9u','CjWIzEGhK04','CjV6tLNPEJP','CjTjkxDP8i_',
		'CjRJj36v2Y5','CjOSqqEvxI7','CjGMBGlrRO_','CjGK53pLVh4','CjFE_yQuQkg','CjDqH9fr0bN','Ci3-zHQuJCP','Ci0eHPtv0D8','Cix_NNPPqjI','CiBZrSpP-0l',
		'CiA0VV1PN7j','Ch8ldFWL2ke','CfuycK_JPq9','CffK25zvl9r','CeuUgiSpRzp','CejnQXav4ns','CeciLjUrf_p','CeR02o4PTCC','CePzn9iLrUF','CeNH-_bLMN_',
		'CduCSURpqjr','CdoVIqqvOoi','CdjNMc8vVDk','CdbSd7TJJj_','CdZnbkdr2T8','CdMC85KPHOl','CdD9H4hFFBI','Cc00LHHviie','CcwX-uqpJc0','CcuMi9OuolM',
		'CcqLR2mrwqO','Cciuyo9p1cx','CcZZNtbLxxo','CcVu5rLJ6Dv','CcMa7xhLOZW','CcL01JZPuQ6','CcEMtK9uAgV','CbvWDksP5OK','CbaMbfALGbH','CZr8u9MPhf7',
		'CZr8ZIKPnLq','CZSG3zBpF0P','CYkKh0iPL5A','CVeFLFmMs5I','CVBD9pmJgjp','CU5nTzAhI06','CUas4TkhJRt','CUaoXZGAm05','CUaX2ncJEZB','CUXpnbxFmz8',
		'CUG8mdRl640','CUBChbaB2S7','CTqPUurJetS','CNs85heAyao','CNsmQs5APYE','CMkzeM8gm-g','CMiUPjQg1tC','CLczdDVgThz','CE-iDs7A2Oo','CDNknf5gORG',
		'CCowMchJnrh','CCCzJcqgLLp','CB3qiKjgEKW','CA_1ETXAfuy','CA8ReyIgoZx','CA6eOl2gT83','B_k56XpARob','B_k5pe4gWYC','B90DibAg3qj','B9QnjE1gWyA',
		'B9QnQt9Ac_n','B85E9FuAS4C','B8wwJl6gwXm','B8kfS2CgS_X','B8U0uoBAN6Q','B8NK3qrAM06','B7mLhYUF0-B','B4dWKKBF0vo','B36Sfq5lzgy','B3aNKpNgcSH',
		'B3DtNsLg60U','B0ZwcrSg5nh','Bxh31SLASiE','Bw206o6gC5u','BqPPnVtlp6O','BpELZkXFsQp','BmUCMe4Fi_6','BjitiCwlSY9','BjWMYinFbEM','Bi3a59zlvnk',
		'BiZjLNQlz0h','BhevXnQFSOD','BhXpeqBlIK4','BhKv2vtBzUD','BhKvjsoBYSp','BhF9PRPh4Qq','BgAOVNSg8IL','Bfg9IrCD64Z','BfFIHbPDyxd','BfFDyWtl-T3',
		'Be1a62VDYMB','BeoCKXCj1xG','BcJYuzylNoW','BESqmlxL_Vk','BESDo-jL_WF','BBjBqJwr_UL','BA2iQMCyE-u','-QtU0qSE-h','-QG7u-SE1m','9Zg98VSE4M',
		'9XN5N0L_Tf','9Mvpc_r_Zn','2jXmAbyEyU',

	]

var totCount = wordContent.length;  // count of posts
var itemsPerPage = 5;
var currentPage = 1;

function showPage(page) {
var container = document.getElementById("content");
container.innerHTML = "";

for (var i = (page - 1) * itemsPerPage; i < page * itemsPerPage && i < wordContent.length; i++) {
    var word = wordContent[i];

    // Yes this line is very long. Future refinement- break into multiple lines for readability
    // NOTE: the "word" variable (seen above) is actually a code for an Instagram post. we are calling it "word" because
    //       a separate part of the system requires it.
    var instagramBlockquote = '<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/' + word + '/?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"> <div style="padding:16px;"> <a href="https://www.instagram.com/p/' + word + '/?utm_source=ig_embed&utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"> </div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"> </div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"> </div> </div> </div> <div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"> <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-511.000000, -20.000000)" fill="#000000"> <g> <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"> </path> </g> </g> </g> </svg> </div> <div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div> </div> <div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"> <div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"> </div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"> </div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"> </div> </div> <div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"> </div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"> </div> </div> <div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"> </div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"> </div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"> </div> </div> </div> </a> </div> </blockquote>';
    // iframe version below (note: is backup; rendering is often buggy)
    // var instagramBlockquote = '<iframe max-width="100%" scrolling="no" src="https://instagram.com/p/'+word+'/embed" frameborder="0"></iframe>';

    var div = document.createElement("div");
    div.innerHTML = instagramBlockquote;
    container.appendChild(div);
}

// Disable Previous button if there's no previous page
var prevBtn = document.getElementById("prevBtn");
prevBtn.disabled = (currentPage === 1);

// Disable Next button if there's no next page
var nextBtn = document.getElementById("nextBtn");
nextBtn.disabled = (currentPage === Math.ceil(wordContent.length / itemsPerPage));

// Display current page number
var pageLabel = document.getElementById("pageLabel");
pageLabelTop.innerHTML = "Page " + currentPage + " (total posts: " + totCount + ")";
pageLabelBottom.innerHTML = "Page " + currentPage;

// Run embed.js again
// https://stackoverflow.com/questions/37322148/why-is-instagram-embed-code-only-showing-an-instagram-icon-not-the-image 
// https://ekeitho.medium.com/react-instagram-embedding-1646e05c2bb
// ... to detect and apply to any Instagram posts added after initial page rendering
// Note: with our page structure's custom js assembly for Instagram posts, ALL our posts are "after initial page rendering"
window.instgrm.Embeds.process();
// When the Instagram embeds script is loaded on a webpage, it automatically searches the page for any Instagram post embeds and renders them. Sometimes, however, the Instagram embeds script may not detect new embeds that have been added to the page after it was initially loaded. In this case, you can use the window.instgrm.Embeds.process() code to manually trigger the script to search for and render any new Instagram embeds on the page. Note that this code will only work if the Instagram embeds script has already been loaded on the page. If it has not been loaded, you will need to load it first before using this code.
}

function prevPage() {
if (currentPage > 1) {
    currentPage--;
    updateUrlParam("p", currentPage);
    location.reload();
}
}

function nextPage() {
if (currentPage < Math.ceil(wordContent.length / itemsPerPage)) {
    currentPage++;
    updateUrlParam("p", currentPage);
    location.reload();
}
}

function updateUrlParam(key, value) {
var urlParams = new URLSearchParams(window.location.search);
urlParams.set(key, value);
window.history.replaceState(null, "", "?" + urlParams.toString());
}

// Retrieve current page from "p" URL parameter on load
window.addEventListener("load", function () {
var urlParams = new URLSearchParams(window.location.search);
var paramPage = parseInt(urlParams.get("p"));
if (!isNaN(paramPage) && paramPage > 0) {
    currentPage = paramPage;
}
showPage(currentPage);
});




