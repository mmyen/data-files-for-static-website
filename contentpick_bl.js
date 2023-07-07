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

		'CuUvG_UpFcD','CuUr8H1pUj4','CuSlcXfOiyG','CuQDFMzOPCv','CuPzv0VOiWc','CuPqhS5vhyQ','CuPfPGbLgUd','CuPWj41ulBU','CuFjjeZvAfY','CuFLDZyRO7m',
		'CuC5c9Trhev','CuC2hyyPxgt','CuC2Cj6P6Ip','CuC0YBOJmwn','CuAdVRex2fn','CuAR9CaJpxO','CuABkV1O0l2','Ct9dD5SxwN0','Ct431sASHN3','Ct2rt0jxWWm',
		'Ct1xl18poG2','CtzfNcuvukS','CtxVu3ZOS5T','CtxH7VwOZKn','CtwmwrJL26k','CttOqSMudfW','CtsPBpDPIUg','Ctr7Rb0yMsv','CtrnJe_PUAJ','CtlBcElOtS2',
		'Ctk64lSv9Gt','CtkHyQxvYZW','CtiQcJerhh6','Cth8NtPBdfa','Cthpno7SCz2','CthQK2VJFUK','CtfTx00Pn37','Cte5QUXBwdO','Ctari9rrOSy','CtXCeL3PfG0',
		'CtVKqoqRkUr','CtVEibwsR62','CtUrbj9vnKo','CtUXddSRSln','CtSgHrKghn3','CtR-y4RverN','CtR-E3Svf9y','CtR99MlvJm3','CtP-AtHpCJe','CtPbvpVvVxF',
		'CtNJWw6S9b2','CtMr_D7PtVv','CtLIPF3rbTq','CtKeOmTyHSH','CtKRcPCPHz7','CtIijGTLypo','CtIRL-Pv20c','CtIEdgIPzlN','CtIDNIMPs0l','CtH_w7AvjFh',
		'CtHsof4PILG','CtHbO3gJgQA','CtFtD5ypA5V','CtFYl9fPOOQ','CtFW9K0ycW-','CtFWmmLyQmD','CtAd_rpvSCT','CtAYwnOvpA4','CtAOAgWSku-','Cs_8gvfMfmr',
		'Cs_7uCRJu8T','Cs_mjAALEyM','Cs96elTPZsB','Cs96aaIvRSd','Cs9n6AwrQ-t','Cs9YgIhP9dy','Cs9FwnQrwAW','Cs9DzdGBiNQ','Cs7odzIxy_N','Cs7ntnWrMa9',
		'Cs62-nuPavX','Cs6y6mnvDE4','Cs6t6MbvpcG','Cs6qSHpJKpw','Cs6p8kMvGki','Cs47A8dR8e7','Cs464VjOMai','Cs44gh2R4hh','Cs4wBCaPtHc','Cs4r2-lPgt7',
		'Cs4OqHBPnQI','Cs4OmVvP4Aa','Cs4GNyWvkXS','Cs3rSCYrevW','Cs2sIgxuHzp','Cs1zrdAvyhF','Cs1pN-ov8p2','Cs1jb1ivR7M','CswUk-kxh-S','CsuOhBfSBvp',
		'CsuG7nWSxw4','Cst5MqOP90x','CstuxN9psVL','CssE9SmrBSW','CssDVXCpf9s','Csr_-hGp6jL','Csr6l8cv8a3','CsrrSajvJiU','CsrnH5rAsYY','Csrm8KUyBGm',
		'CsrXqF9Pt0h','CsotETnvINJ','CsoTZqYLh2e','Csmygz_u7QG','CsmnudMvIzF','CsmiDxav8Rh','CsmUrmSSb2P','CsmUkQEyTaS','CsmO4e4vmp4','CsmNRQbP_Tw',
		'CsmLsAXrFi_','Csl4Ag3OKQG','Csl0cGvpz9n','CskQokeJ7qG','CskIzOOOKB4','CsjyRwzAVRW','CsjsggoSsR_','Csjm4vRvIV-','CsjGWwcr6uj','CsiGkkfu8qk',
		'Csh7bloLgon','Csh5M77rwJ6','CshwbFfrAHh','Csfs3x9uofr','CsfX2orueBA','Cscp9sGgcsQ','CscPMYGvN0H','CscMZ1jSpXC','CsZtsFCvyoQ','CsZOG3_phz2',
		'CsX12aKuy2H','CsXjSTTL1uE','CsXOYlbvK7B','CsXJzUWvx3O','CsWwc1og1sB','CsVBQSgrAB0','CsU9w8DroNG','CsU5q4vreX2','CsUzrb2Jthd','CsUtisNPdG6',
		'CsUMSJzPTGM','CsSQqvALunB','CsR4UJaPt8G','CsRsdIySJpq','CsP6hF4rSPv','CsPoklrJynw','CsO6-3qvXqu','CsNK7HoLt3V','CsKl71rLODn','CsKHnOavaAq',
		'CsKE-SDyhmE','CsJ_UJRvuuG','CsJ5qOkPWI0','CsJwCXSp6j9','CsJpPWopOOe','CsFQUKRvbTb','CsE6ZD1yvhE','CsE5irWPXp6','CsC8YLJLKg6','CsB8DmRpST2',
		'CsAWF4Wrn_h','Cr_zbDYv6Im','Cr_pULzvMfy','Cr_eAzfh9fl','Cr_a7iMpOji','Cr7U7BGLIxc','Cr3rrsBJpwR','Cr16UcKJUlV','CrxLIBbrWsN','Crw0DoFr3BG',
		'Crwt6GApVE5','CrwSfTFSYaZ','CrwAKJUPwuN','CrudF1tOxfp','CrubgFpOdQ9','Crt8k0Zvx4C','Crt7yRYvkAo','Crt2Y9zPob5','CrtrzaDv9OR','CrtjwD9PG9L',
		'Crti6DXvb2Z','Crr6BcNPgEq','CrrA-ZIvxGs','Cro3DPfPZH1','Croroievjwt','CrmqFH7vzFD','Crmb01OpIPZ','CrmSbvDPjBd','Crl4Q4hvD-0','CrlrMB-JqI6',
		'Crj3_4jpt02','Crjf85qPJvg','CrhKVOBv4kC','Crg-afCv4y0','Crg0ZvevVA4','CrgzcWfv6X8','CrfB3U5r79E','CrfBlDHrlRt','CreOqmWPp9e','CrcT6esLC0q',
		'Crb6XW8vx43','CrbF8B6rT4i','CrZqD5QJKUp','CrUsLjhsuPV','CrULqPgOEwE','CrUINx3rdNh','CrTkfmMLq9S','CrTfOoNL6ak','CrRIpM1Ae3_','CrQ_iR6L1UQ',
		'CrM304wrYbg','CrMgx_GPCxU','CrMZhLmvuM_','CrMGcl9Pcwc','CrMEGydv3GW','CrL-KeLv9Vm','CrL8goiJq0u','CrLwq8vOvkL','CrJeAoxPW92','CrJN6BzLwJS',
		'CrH7t5wOIDY','CrHRPHnvHtE','CrEc7S_PwNz','CrEQ8UQpXDz','CrBz3JGu6bN','CrBpEwwPVsM','CrAZ5ituVtd','Cq_vGhVPwyC','Cq_oBeavy7f','Cq-y7dNLnXD',
		'Cq94d1SOvyD','Cq9rA2yuwcZ','Cq9dQMOr8wG','Cq9PO00JAgS','Cq8mrdXO4cP','Cq6Iv1OP61g','Cq3mMZyPjlB','CqyXlD3vAPq','CqwtAPHLy6w','Cqv-_pfPOp1',
		'CqtA1jfp9CM','Cqq6G4pvHoX','CqlqjOSJhhN','CqlO26_JuSU','CqjoGG4L_Y1','CqeerI5L6Vs','CqbTKOAvaJA','CqZEUgzP8vW','CqYyZn8vEFD','CqYoSejvexW',
		'CqOvDXov1lB','CqMXL4ZJc6b','CqMWXtkpzMl','CqMVpjGJ5tD','CqLjdJGpJEM','CqJl1HvP_lS','CqCjCT_uimn','CqCRKNJOVKi','CqB95HOoFUS','CqB1gHSv2kW',
		'CqByq-IPmrW','Cp6Tl48vBGb','Cp6AC1XjdN9','Cp3IXnQDR0A','Cp0xnusv2Jd','CpwRzK9OEIi','CpvYUAXP9xk','CposRzNO_dy','CpmGPkuNuaz','Cpl7V40BZnN',
		'Cplp1WqhJGh','CplHtVIh-jZ','CpkxEvnouwb','CpixZydPLFb','CpgoblbrnSf','CpYNjhsvVoX','CpWkXzfjGM2','CpTDkFSvX-f','CpQ1p1bMi1Q','CpOrvqyLCc7',
		'CpOpwslrX1S','CpL72s3OJuW','CpDaOPlJTYb','Co5s8_VP03l','Co3_dTSOhnV','CoyDI0TvxNy','CotRumrrFS4','CosUxAFD0Mc','CoqskylLZsw','ConackKv-eM',
		'ConFK-DJ4s8','CogryaAL_sb','CodDhRDvW_T','CoaJX1LJXLr','CoSgoLZvBSU','CoOfGRurSVp','CoLSbGbvqET','CoLRET0vt5A','CoLEkAsPlEe','CoK5lE7vICZ',
		'CoJP6jirhmM','CoJB4ygJLDu','CoGeZl5JirX','CoGOburyHYn','CoBraHbg7rk','Cn5UvnavnYU','Cn2sGpDSMc2','CnxmZsKvGFo','CnoHspdr6gK','CnkrpMxPCsB',
		'CnkRdk3PrQ6','CnfdmhbSrw1','CnS5ByvvUgD','Cl9-3BopfpK','Ck_ZtLSP31b','Ck7WNLrLTz4','CkwRZIfSAh_','Ckum_u8OJZs','Ckd1a_iLaKx','CkPKXW4v5yj',
		'CkG3p0HOOsc','Cj3lfR9SjSa','CjtJ6bvvw38','Cjs-V-4J-qy','CjgQC-6v6YQ','CjUMKC2rmFt','CjTTp9jpIcC','CjTKkimJ3xX','CjRkBFjrDej','CjOzzNLpgmr',
		'CjJirEePV46','CjGOB2CLeRm','CjD62YrjlO9','Ci3E4RIvjzJ','Ci1V0SCLyDW','CivU7JPubjM','Ciq9L4crRd4','Cil8OfDLWJ1','Cii1UYvvW9s','Cii1N5MPwLN',
		'CegoAc9L_kx','Cegn9Wprq36','CePQgLLNs9D','CeJfte3MNoP','CeEtN6rvtGa','Cd7J0fkr4sf','CdovXQBv65K','CdEWRHPPItu','Cc12Xl9FZCD','Cai-51-ri9r',
		'CY7jKntvIJR','CYp7MuRrdpK','CX_sCUvB8oo','CX1uF59JcE4','CXwTKl9p73S','CWXEYQQp_Ra','CWDs9K-DbH_','CV6Q_HSvRXc','CVhRPSuLseP','CVUk9uSLjP0',
		'CVJL_CEBsC7','CUomM42L-UI','CSzxMn-pRWX','CRjj9tWguYw','CO9HS0qgCt7','CO1D03_jhJv','COw4gmasq3L','COtyJ0ApS_U','COCdW7DFFPs','CNn524TjJb1',
		'CMQIYvdLqBY','CLuGphrjv8Y','CLp4dJ-rPXx','CLpMJqNL_og','CLgIqp6rAh_','CLe9mX7spXe','CLcY3xUs-qn','CLXIm3ysW-u','CLUf9bnMEbU','CLKv5S9j099',
		'CK7ZrWUjXDe','CKrjFiAFvtE','CKGIaVqFiSK','CKGHacelKeT','CIhD8wnFQWR','CHbo1AqDbGZ','CHW0i3NjzlQ','CCcFrlupwEq','CCHvIcfJdv-','CBEkLj7p1gg',
		'CA_RCH-pe_P','CA6RbHGpsvd','CAQxz15JuGS','B_YoTdnpict','B45fOSVAJr6','B4wc0n1AX2U','BuHxTbrgEcq','Bt9N_fCAY0P','BtmI0UcAOhA','Bszgy3Rgped',
		'BqTLjaaAvBc','BpLZnPClCCv','BpK-YGqlXnr','BpD4YIQlfos','Bo5EcEUlz1s','BozxDDNFtOJ','Bn4VbjKH5TF','BnqDEm0ngSv','BehQ1tEjh7G','BB9CjUrt5lf',
		'BB5psb2N5vq','BByz7sxt5nR','BBoHFYvt5nH','-UtvhiN5oR',

]

// below set of vars is the Instagram post IDs by each campus
var contentBerkeley = ['CuPfPGbLgUd','CuAdVRex2fn','CuAR9CaJpxO','CsoTZqYLh2e','CsVBQSgrAB0','CsU9w8DroNG','CsU5q4vreX2','CsUzrb2Jthd','CsSQqvALunB','Cr_a7iMpOji',
						'CrwAKJUPwuN','Crti6DXvb2Z','Crr6BcNPgEq','Cro3DPfPZH1','Croroievjwt','Crj3_4jpt02','CrgzcWfv6X8','CrcT6esLC0q','Crb6XW8vx43','CrEQ8UQpXDz',
						'CrAZ5ituVtd','Cq_vGhVPwyC','Cq94d1SOvyD','Cq9dQMOr8wG','Cq6Iv1OP61g','Cq3mMZyPjlB','CqyXlD3vAPq','CqwtAPHLy6w','CqJl1HvP_lS','CpvYUAXP9xk',
						'CposRzNO_dy','CpmGPkuNuaz','Cpl7V40BZnN','Cplp1WqhJGh','CplHtVIh-jZ','CpkxEvnouwb','Cn2sGpDSMc2','CnkRdk3PrQ6','CjtJ6bvvw38','Cc12Xl9FZCD',
						'COw4gmasq3L','CLe9mX7spXe','CLcY3xUs-qn','CLXIm3ysW-u','CLUf9bnMEbU','CCcFrlupwEq','CCHvIcfJdv-','CBEkLj7p1gg','CA_RCH-pe_P','CA6RbHGpsvd',
						'BpLZnPClCCv','BpK-YGqlXnr','BpD4YIQlfos','Bo5EcEUlz1s','BozxDDNFtOJ','BB9CjUrt5lf','BB5psb2N5vq','BByz7sxt5nR','BBoHFYvt5nH','-UtvhiN5oR',]
var contentDavis = ['CtsPBpDPIUg','CtFYl9fPOOQ','CtFW9K0ycW-','CtFWmmLyQmD','Cs96aaIvRSd','CsrnH5rAsYY','CsmO4e4vmp4','CrtjwD9PG9L','CrH7t5wOIDY','Cqv-_pfPOp1',
						'Co5s8_VP03l','CoSgoLZvBSU','CoJP6jirhmM','CnfdmhbSrw1','CjJirEePV46','CjGOB2CLeRm','Ci3E4RIvjzJ','Cii1UYvvW9s','Cii1N5MPwLN','Cai-51-ri9r',]
var contentIrvine = ['CuUvG_UpFcD','CuUr8H1pUj4','CuSlcXfOiyG','CuQDFMzOPCv','CuPzv0VOiWc','CuFjjeZvAfY','CuFLDZyRO7m','CuC5c9Trhev','CuC2hyyPxgt','CuC2Cj6P6Ip',
						'CuC0YBOJmwn','Ct1xl18poG2','CtzfNcuvukS','CtxVu3ZOS5T','CtxH7VwOZKn','CtwmwrJL26k','Cth8NtPBdfa','Cthpno7SCz2','CthQK2VJFUK','CtfTx00Pn37',
						'Ctari9rrOSy','CtUXddSRSln','CtR-y4RverN','CtR-E3Svf9y','CtR99MlvJm3','CtP-AtHpCJe','CtIDNIMPs0l','CtHbO3gJgQA','Cs_7uCRJu8T','Cs_mjAALEyM',
						'Cs6qSHpJKpw','Cs464VjOMai','Cs4OmVvP4Aa','Cs4GNyWvkXS','Cs3rSCYrevW','CsuOhBfSBvp','CsuG7nWSxw4','Csr6l8cv8a3','Csrm8KUyBGm','CsotETnvINJ',
						'Csmygz_u7QG','CsmLsAXrFi_','Csl4Ag3OKQG','CskIzOOOKB4','Csjm4vRvIV-','CsjGWwcr6uj','Csh5M77rwJ6','CsfX2orueBA','CsO6-3qvXqu','CsKE-SDyhmE',
						'CsJ_UJRvuuG','CsJwCXSp6j9','CsJpPWopOOe','CsE6ZD1yvhE','CsC8YLJLKg6','CsB8DmRpST2','Cr7U7BGLIxc','Cr3rrsBJpwR','CrwSfTFSYaZ','CrubgFpOdQ9',
						'CrtrzaDv9OR','Crl4Q4hvD-0','Crg0ZvevVA4','CrZqD5QJKUp','CrUsLjhsuPV','CrULqPgOEwE','CrRIpM1Ae3_','CrM304wrYbg','CrMZhLmvuM_','CrMEGydv3GW',
						'CrL8goiJq0u','CrJeAoxPW92','CrHRPHnvHtE','CrBz3JGu6bN','Cq-y7dNLnXD','Cq9PO00JAgS','Cq8mrdXO4cP','CqtA1jfp9CM','CqlqjOSJhhN','CqlO26_JuSU',
						'CqeerI5L6Vs','CqbTKOAvaJA','CqYoSejvexW','CqB1gHSv2kW','Cp6Tl48vBGb','Cp3IXnQDR0A','CpYNjhsvVoX','CpDaOPlJTYb','CoyDI0TvxNy','CosUxAFD0Mc',
						'CoqskylLZsw','CogryaAL_sb','CoaJX1LJXLr','Ck7WNLrLTz4','CkwRZIfSAh_','Ckd1a_iLaKx','CkPKXW4v5yj','CkG3p0HOOsc','Cj3lfR9SjSa','Cjs-V-4J-qy',
						'CjgQC-6v6YQ','CjTTp9jpIcC','CjTKkimJ3xX','CjRkBFjrDej','CjOzzNLpgmr','CivU7JPubjM','Ciq9L4crRd4','Cil8OfDLWJ1','CegoAc9L_kx','Cegn9Wprq36',
						'CePQgLLNs9D','CeJfte3MNoP','CeEtN6rvtGa','Cd7J0fkr4sf','CdovXQBv65K','CdEWRHPPItu','COCdW7DFFPs','CKrjFiAFvtE','CKGIaVqFiSK','CKGHacelKeT',
						'CIhD8wnFQWR','CHbo1AqDbGZ','CHW0i3NjzlQ',]
var contentLosAngeles = ['CuPqhS5vhyQ','CuPWj41ulBU','CuABkV1O0l2','Ct9dD5SxwN0','Ct2rt0jxWWm','CttOqSMudfW','Ctr7Rb0yMsv','CtlBcElOtS2','Cte5QUXBwdO','CtXCeL3PfG0',
						'CtVKqoqRkUr','CtMr_D7PtVv','CtLIPF3rbTq','CtIijGTLypo','CtIRL-Pv20c','CtFtD5ypA5V','CtAd_rpvSCT','Cs96elTPZsB','Cs9n6AwrQ-t','Cs9YgIhP9dy',
						'Cs9FwnQrwAW','Cs9DzdGBiNQ','Cs7odzIxy_N','Cs6t6MbvpcG','Cs6p8kMvGki','Cs47A8dR8e7','Cs44gh2R4hh','Cs4wBCaPtHc','Cs1jb1ivR7M','CswUk-kxh-S',
						'Csr_-hGp6jL','CshwbFfrAHh','CscPMYGvN0H','CscMZ1jSpXC','CsX12aKuy2H','CsXjSTTL1uE','CsXOYlbvK7B','CsUtisNPdG6','CsP6hF4rSPv','CsNK7HoLt3V',
						'CsKl71rLODn','Cr_eAzfh9fl','CrudF1tOxfp','Crmb01OpIPZ','CrLwq8vOvkL','Cq_oBeavy7f','Cqq6G4pvHoX','CqjoGG4L_Y1','CqMXL4ZJc6b','CqMWXtkpzMl',
						'CqMVpjGJ5tD','CqLjdJGpJEM','CqCjCT_uimn','CqCRKNJOVKi','CqB95HOoFUS','CqByq-IPmrW','Cp6AC1XjdN9','Cp0xnusv2Jd','CpwRzK9OEIi','CpQ1p1bMi1Q',
						'CpL72s3OJuW','CotRumrrFS4','ConackKv-eM','ConFK-DJ4s8','CodDhRDvW_T','CoLEkAsPlEe','CoK5lE7vICZ','CoJB4ygJLDu','CoGeZl5JirX','CoGOburyHYn',
						'CoBraHbg7rk','CnoHspdr6gK','CnkrpMxPCsB','CnS5ByvvUgD','Cl9-3BopfpK','Ck_ZtLSP31b','CjUMKC2rmFt','CjD62YrjlO9','Ci1V0SCLyDW','CYp7MuRrdpK',
						'CX_sCUvB8oo','CX1uF59JcE4','CXwTKl9p73S','CWDs9K-DbH_','CSzxMn-pRWX','CMQIYvdLqBY','CLp4dJ-rPXx','CLpMJqNL_og','CLgIqp6rAh_','BuHxTbrgEcq',
						'Bt9N_fCAY0P','BtmI0UcAOhA','Bn4VbjKH5TF','BnqDEm0ngSv',]
var contentMerced = ['CtrnJe_PUAJ','CsR4UJaPt8G','CsPoklrJynw','CsJ5qOkPWI0','CsE5irWPXp6','CrxLIBbrWsN','Crw0DoFr3BG','Crwt6GApVE5','Crt7yRYvkAo','CrmqFH7vzFD',
						'CrmSbvDPjBd','CrlrMB-JqI6','Crjf85qPJvg','CrhKVOBv4kC','Crg-afCv4y0','CrTkfmMLq9S','CrQ_iR6L1UQ','CrL-KeLv9Vm','CrJN6BzLwJS','CrBpEwwPVsM',
						'CpWkXzfjGM2','CoOfGRurSVp','CoLSbGbvqET','CoLRET0vt5A','Cn5UvnavnYU',]
var contentRiverside = ['CtSgHrKghn3','CtH_w7AvjFh','CtAOAgWSku-','Cs_8gvfMfmr','Cs62-nuPavX','Cs6y6mnvDE4','CsjyRwzAVRW','Cr_pULzvMfy','Crt2Y9zPob5','CreOqmWPp9e',
						'CrUINx3rdNh','Ckum_u8OJZs','CV6Q_HSvRXc','CRjj9tWguYw','CO9HS0qgCt7',]
var contentSanDiego = ['CtPbvpVvVxF','CtNJWw6S9b2','CtKeOmTyHSH','CtKRcPCPHz7','CtAYwnOvpA4','Cst5MqOP90x','CsmUkQEyTaS','CsjsggoSsR_','Csfs3x9uofr','CsZtsFCvyoQ',
						'CsZOG3_phz2','CsRsdIySJpq','CsFQUKRvbTb','CsAWF4Wrn_h','CrMgx_GPCxU','CrMGcl9Pcwc','CqZEUgzP8vW','CqYyZn8vEFD','CqOvDXov1lB','CpgoblbrnSf',
						'CO1D03_jhJv','CNn524TjJb1','CLuGphrjv8Y','CLKv5S9j099','CK7ZrWUjXDe',]
var contentSantaBarbara = ['Ct431sASHN3','Cs4OqHBPnQI','Cs1zrdAvyhF','CstuxN9psVL','CssE9SmrBSW','CssDVXCpf9s','CsrXqF9Pt0h','CsmnudMvIzF','CsmiDxav8Rh','CsmUrmSSb2P',
						'CsmNRQbP_Tw','Csl0cGvpz9n','CsiGkkfu8qk','Csh7bloLgon','Cr_zbDYv6Im','Cr16UcKJUlV','CrfB3U5r79E','CrfBlDHrlRt','CrbF8B6rT4i',]
var contentSantaCruz = ['Ctk64lSv9Gt','CtkHyQxvYZW','CtiQcJerhh6','CtVEibwsR62','CtUrbj9vnKo','CtIEdgIPzlN','CtHsof4PILG','Cs7ntnWrMa9','Cs4r2-lPgt7','Cs2sIgxuHzp',
						'Cs1pN-ov8p2','CsrrSajvJiU','CskQokeJ7qG','Cscp9sGgcsQ','CsXJzUWvx3O','CsWwc1og1sB','CsUMSJzPTGM','CsKHnOavaAq','Crt8k0Zvx4C','CrrA-ZIvxGs',
						'CrTfOoNL6ak','CrEc7S_PwNz','Cq9rA2yuwcZ','CpixZydPLFb','CpTDkFSvX-f','CpOrvqyLCc7','CpOpwslrX1S','Co3_dTSOhnV','CnxmZsKvGFo','CY7jKntvIJR',
						'CWXEYQQp_Ra','CVhRPSuLseP','CVUk9uSLjP0','CVJL_CEBsC7','CUomM42L-UI','COtyJ0ApS_U','CAQxz15JuGS','B_YoTdnpict','B45fOSVAJr6','B4wc0n1AX2U',
						'Bszgy3Rgped','BqTLjaaAvBc','BehQ1tEjh7G',]
var totCount = wordContent.length;
var itemsPerPage = 5; // "Pick" page just shows one page (no Next/Prev) anyways
var currentPage = ""; // so initial page load is "no school"

function showPage(page) {
var container = document.getElementById("content");
container.innerHTML = "";

wordContent = eval('content'+currentPage);

for (var i = 0; i < itemsPerPage && i < wordContent.length; i++) {
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

// Display current page number
var pageLabel = document.getElementById("pageLabel");
pageLabelTop.innerHTML = "Newest " + itemsPerPage + " Posts from";
pageLabelBottom.innerHTML = "Newest " + itemsPerPage + " Posts";


// Run embed.js again
// https://stackoverflow.com/questions/37322148/why-is-instagram-embed-code-only-showing-an-instagram-icon-not-the-image 
// https://ekeitho.medium.com/react-instagram-embedding-1646e05c2bb
// ... to detect and apply to any Instagram posts added after initial page rendering
// Note: with our page structure's custom js assembly for Instagram posts, ALL our posts are "after initial page rendering"
window.instgrm.Embeds.process();
// When the Instagram embeds script is loaded on a webpage, it automatically searches the page for any Instagram post embeds and renders them. Sometimes, however, the Instagram embeds script may not detect new embeds that have been added to the page after it was initially loaded. In this case, you can use the window.instgrm.Embeds.process() code to manually trigger the script to search for and render any new Instagram embeds on the page. Note that this code will only work if the Instagram embeds script has already been loaded on the page. If it has not been loaded, you will need to load it first before using this code.
}

function schoolPage() {
    currentPage = document.getElementById("school").value;
    updateUrlParam("s", currentPage);
    location.reload();
}

function updateUrlParam(key, value) {
var urlParams = new URLSearchParams(window.location.search);
urlParams.set(key, value);
window.history.replaceState(null, "", "?" + urlParams.toString());
}

// Retrieve current page from "s" URL parameter on load
window.addEventListener("load", function () {
var urlParams = new URLSearchParams(window.location.search);
var paramSchool = urlParams.get("s");
console.log(paramSchool);
if (typeof paramSchool === 'string') {
    currentPage = paramSchool;
    console.log(currentPage);
    var option = document.querySelector('#school option[value="'+paramSchool+'"]');
      if (option) {
        option.selected = true;
      }
}
showPage(currentPage);
});