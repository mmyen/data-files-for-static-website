# Read the README for background and instructions
# Config settings used by ingest-process-output.py

# Three main groups of settings:
# 1. Apify account
# 2. Instagram usernames of Black student clubs by campus
# 3. Instagram usernames of Latinx student clubs by campus


# Apify account
class ApifyAccess:
    clientKey = 'INSERT_YOURS_HERE'  # keep the quotes
    actorName = 'INSERT_YOURS_HERE'  # keep the quotes

# Instagram usernames of Black student clubs by campus
class BlUsernames:
    berkeley_users = ["aasdcal","afrohousecal","ucbafrica","icecolddynasty","ucbessa","seessaucberkeley",
                    "ucbhubba","ucberkeleylsad","calncnw","calnphc","ucberkeleynsa","africanstudents.berkeley",
                    "betapsichapter1958",]
    davis_users = ["ucdbea","ucdkinghallblsa","bsu_ucd","imanilegal",]
    irvine_users = ["aca._.uci","bcmuci","blackdooruci","bgsn_uci","bgxs.uci","uciblsa","bpsauci","uci_bsu",
                "ucieasa","uci_leadabc","mapsatuci","nsbe_at_uci","nsa.uci","uciblack_","uciumojaclub",
                "wadg_uci","allofusuci","uci_umojapilot","uci_umoja_admissions","irvinenphc","iotapsi",
                "lambdasigma1977","ocnupes","philambda_ques","dst_xiomega","oczetas",]
    ucla_users = ["amcatucla","awcatucla","bbsa_uclaanderson","uclabbrc","bbsa.ucla","bgsa_ucla","uclablsa",
                "bmwc_uclacdu","ucla.bpho","bplaatucla","blaque.ucla","snma_ucladrew","luskinblackcaucus",
                "uclamnm","melanin_melodies","ucla_nblj","uclansbe","nsa.ucla","nommonewsmag","uclaside",
                "ucla.umoja",]
    merced_users = ["asuucmerced","afroucmerced","ucmercedbsu","ucm_nsbe","ucm.bsc",]
    riverside_users = ["ucr.bsu","ucrnsa","ucr.umoja",]
    ucsd_users = ["ucsdbrc","asaxucsd","ucsdbsu","nphc.ucsd","nsbeucsd","umoja_ucsd",]
    ucsb_users = ["ucsb_obsd","ucsb.bsu","nsbeucsb","bgsa.ucsb",]
    ucsc_users = ["ucsc_aarcc","bcmucsc","ucscbma","ucscbsu","e2.ucsc","ucsc_mia","nsbe.ucsc",
                "rpaathucsc","umoja.ucsc",]
    
    all_users = [berkeley_users,
                 davis_users,
                 irvine_users,
                 ucla_users,
                 merced_users,
                 riverside_users,
                 ucsd_users,
                 ucsb_users,
                 ucsc_users]

# Instagram usernames of Latinx student clubs by campus
class LatUsernames:
    berkeley_users = ["reflejosdeucb","cafeucb","ucberkeleyche","casaberkeley","calgammas","berkeley_gals",
                     "haudeucb","hu_berkeley","hes_ucberkeley","alianza.berkeleylaw","lta_deltaomicron",
                     "ucblambdas","berkeleylawlrlj","llsberkeley","ucblagses","ucberkeleylbsa",
                     "lplsberkeley","latinxenvironment","lul_berkeley","ucbmlo","ucbmalcs",
                     "theraicescenter","caltrenza",]
    davis_users = ["ucdalphapisigma","caless.ucd","clca_ucd","clinicatepati","che_at_ucd",
                  "latinxvet","marucdavis","ucd.srrc",]
    irvine_users = ["bfduci","btsaatuci","ccmatuci","dspuci","facesinmathematics_uci","ucidreamcenter",
                   "hudeuci","lta_etagamma","lambdas1986","lasouci","lbsauci","lmsa_ucisom",
                   "maesuci","mesaunidauci","mechadeuci","prelawsocietyuci","nuestragraduci",
                   "sdpnational","gammasatuci","sacnas","shpe_uci","safireatuci",]
    ucla_users = ["ucla_hau","lagentenewsmag","lasoxucla","lmsa.uclacdu","lsfa_ucla",
                 "uclalatinxweekend","luskinlatinxcaucus","uclalatinxgrad","llsa_ucla",
                 "latinxplaucla","uclatlan","uclasoles","unicadeucla",]
    merced_users = ["folkloricodeucm","ucmercedcafe","ucmerced_cki",]
    riverside_users = ["ucralphapisigma","ucralpfa","bf_ucr","lafamiliadeucr","ucr_lsg",
                "ucrlambdas","lsv.ucr","lbsariverside","latinounion","lmsaucr",
                "mujeresunidas_ucr","ucrnak","poderatucr","ucr_puenteconnection","kucr883fm",
                "razaassembly","rbeatriverside","ucrsalsa","ucr.sacnas","salsa_at_ucr",
                "ucrsalsaclub","ucr_sigmas","ucrbetas","beta_ellas","shpeucr",
                "teatroquintosol","ucr_trc","u_e_r","ucr_wcs",]
    ucsd_users = ["ucsd_bfljdm","breakingbarriers_ucsd","casa.de.culturas.ucsd","brasaucsandiego","healthfrontiersintijuana",
                 "tritongammas","haudeucsd","hudeucsd","ucsd_xi_lambdas","mariachi_ucsd",
                 "ucsdphiotas","ucsandiegorhosas","salsasocietyucsd","ucsd_ellas","shpeatucsd",]
    ucsb_users = ["brasaucsb","destinoucsb","elcongreso.ucsb","hauucsb","hu_ucsb",
                 "ucsb_lba","liucsb","mapas.ucsb","mujerucsb","sbklub",
                 "ucsb.sacnas","ucsbgammas","ucsbphiotas","ucsbrhosas","ucsb_sda",
                 "ucsb_betas","thetanukappa","ucsblambdas","sbsunnies","ucsblsg",
                 "ucsbsaz",]
    ucsc_users = ["e2.chale","cau_ucsc","cispesucsc","elateducsc","losmejicas",
                 "haudeucsc","hudeucsc","lta1975","mechadeucsc","ucsc.sacnas",
                 "sabrosuraldt","ucsc_salsita","santacruzbetas","ucscgammas","ucsantacruzellas",
                 "sigmaphizeta_fraternity","shpe.ucsc",]
    
    all_users = [berkeley_users,
                 davis_users,
                 irvine_users,
                 ucla_users,
                 merced_users,
                 riverside_users,
                 ucsd_users,
                 ucsb_users,
                 ucsc_users]