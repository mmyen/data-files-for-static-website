# Read the README for background and instructions

from apify_client import ApifyClient
from config import BlUsernames, LatUsernames, ApifyAccess

# Create the new text content for the contentcore.js files (or another, if desired)
def make_final_file_text_core(material, b=True):
    # material is the list of tuples of the form: (username, shortcode)
    # there are 2 different file names for 2 versions of contentcore.js
    file_string = ""
    if b:
        file_string = 'contentcore_bl.js'
    else:
        file_string = 'contentcore_lat.js'
    write_to = open(file_string,'r+')
    write_to.write("")
    test_string_thing = write_to.readlines()

    num_new = 0

    before_text = ""
    after_text = "\n"

    # Add all text before postContent
    content_core_line = -1
    for k in range(len(test_string_thing)):
        if test_string_thing[k].strip() == "[":
            content_core_line = k
            break
        else:
            before_text += test_string_thing[k]
    
    # Store all old shortcodes
    all_shortcodes = "[\n"
    j = content_core_line + 1
    while test_string_thing[j].strip() != ']':
        all_shortcodes += test_string_thing[j]
        j += 1
    all_shortcodes = all_shortcodes.rstrip()
    if all_shortcodes[-1] != ',' and len(all_shortcodes) != 1:
        all_shortcodes += ','
    all_shortcodes += "\n"

    # Add new shortcodes if not already in
    for i in range(len(material)):
        shortcode = material[i][1]

        if shortcode not in all_shortcodes:
            if i % 10 == 0:
                all_shortcodes = all_shortcodes + "\n\t\t"
            all_shortcodes = all_shortcodes + '\'' + shortcode+'\','
            num_new += 1

    all_shortcodes = all_shortcodes + "\n\t]"
    j += 1

    print("Number of new shortcodes added in "+file_string+":",num_new)

    #Add the rest of the text
    while j < len(test_string_thing):
        after_text = after_text + test_string_thing[j]
        j += 1
    write_to.close()
    return before_text + all_shortcodes + after_text

# Create the new text content for the contentpick.js files (or another, if desired)
def make_final_file_text_picker(material,b=True):
    # material is the list of tuples of the form: (username, shortcode)
    # 2 different file names for 2 versions of contentpick.js
    file_string = ""
    if b:
        file_string = 'contentpick_bl.js'
    else:
        file_string = 'contentpick_lat.js'
    write_to = open(file_string,'r+') # Replace file name (first parameter) as needed
    write_to.write("")
    test_string_thing = write_to.readlines() #Reads lines of text in file; returns a list where each item is a line
    before_text = ""
    after_text = ""

    # The contentpick.js/related file should have the buckets in the following order:
    #   - Berkeley
    #   - Davis
    #   - Irvine
    #   - Los Angeles
    #   - Merced
    #   - Riverside
    #   - San Diego
    #   - Santa Barbara
    #   - Santa Cruz

    if b:
        list_to_use = BlUsernames.all_users
    else:
        list_to_use = LatUsernames.all_users

    num_new = 0

    # Find line with var postContent and store all text before that in before_text
    content_core_line = -1
    for k in range(len(test_string_thing)):
        if test_string_thing[k].strip() == "[":
            content_core_line = k
            break
        else:
            before_text += test_string_thing[k]
    
    # Store all old shortcodes
    all_shortcodes = "[\n"
    j = content_core_line + 1
    while test_string_thing[j].strip() != ']':
        all_shortcodes += test_string_thing[j]
        j += 1
    all_shortcodes = all_shortcodes.rstrip()
    if all_shortcodes[-1] != ',' and len(all_shortcodes) != 1:
        all_shortcodes += ','
    all_shortcodes += "\n"
    
    between_text = "\n"

    # Find the line with the first bucket (Berkeley)
    first_bucket = -1
    for m in range(j, len(test_string_thing), 1):
        if "var contentBerkeley" in test_string_thing[m]:
            first_bucket = m
            break
        else:
            between_text += test_string_thing[m]
    
    # Add all text after last bucket (Santa Cruz)
    after_start = first_bucket + 9
    while after_start < len(test_string_thing):
        if "var totCount" in test_string_thing[after_start]:
            break
        else:
            after_start += 1
    
    for n in range(after_start, len(test_string_thing), 1):
        after_text += test_string_thing[n]
    
    # Add existing shortcodes for each bucket
    final_string = ""
    uc_shortcode_lists = ["","","","","","","","",""]

    v = first_bucket
    i = 0
    str_temps = ["contentDavis","contentIrvine","contentLosAngeles","contentMerced",
                 "contentRiverside","contentSanDiego","contentSantaBarbara","contentSantaCruz",
                 "totCount"]
    
    for s in str_temps:
        while s not in test_string_thing[v]:
            if test_string_thing[v][-2] != "]":
                uc_shortcode_lists[i] += test_string_thing[v]
            else:
                uc_shortcode_lists[i] += test_string_thing[v][:-2:1]
            v += 1
        i += 1

    # Keep track of number of shortcodes in each bucket for formatting purposes
    bucket_counts = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    # Iterate through all shortcodes
    #   - IF not already in bucket:
    #       - Add to postContent (redundant)
    #       - Add to correct bucket

    i_2 = 0
    print("Username\tShortcode")

    for i in range(len(material)):
        user = material[i][0]
        shortcode = material[i][1]
        user_index = -1

        for j in range(9):
            if user in list_to_use[j]:
                user_index = j
                break


        if user_index != -1 and shortcode not in uc_shortcode_lists[user_index]:
            print(user+"\t"+shortcode)
            # Add newline for every 10 shortcodes in the bucket
            if bucket_counts[user_index] % 10 == 0 and bucket_counts[user_index] != 0:
                uc_shortcode_lists[user_index] = uc_shortcode_lists[user_index] + "\n\t\t\t\t\t\t"
            uc_shortcode_lists[user_index] = uc_shortcode_lists[user_index] + '\''+shortcode+'\','
            # Add newline for every 10 shortcodes overall
            if i_2 % 10 == 0:
                all_shortcodes = all_shortcodes + "\n\t\t"
            all_shortcodes = all_shortcodes + '\''+shortcode+'\','
            bucket_counts[user_index] += 1
            num_new += 1
            i_2 += 1

    print("Number of new shortcodes added in "+file_string+":",sum(bucket_counts))

    if sum(bucket_counts) == 0:
        print("No new additions")

    # Put all buckets together
    for i in range(9):
        uc_shortcode_lists[i] += ']\n'
        final_string += uc_shortcode_lists[i]
    write_to.close()

    # Return final string
    return before_text + all_shortcodes + between_text + final_string + after_text

# Set the contents of file_name to file_text
def put_into_file(file_text, file_name):
    file_obj = open(file_name,'w')
    file_obj.write('') # Clears the file
    file_obj.write(file_text)
    file_obj.close()
    print(file_name+" changed")

# Store an old version of file_name in file_name_old.js
# NOTE: This method is specifically tailored so that the file to be backed up is a .js
def backup_prev_ver(file_name):
    old_file = open(file_name[:-3]+"_old.js",'w')
    curr_file = open(file_name,'r')
    curr_file_text = curr_file.read()

    old_file.write(curr_file_text)
    old_file.close()
    curr_file.close()
    print(file_name[:-3]+"_old.js"+" updated")

def main():

    client = ApifyClient(ApifyAccess.clientKey)

    #client.actor(...).call(...) --> this will be scheduled
    tasks_test = client.tasks()
    list_of_tasks = tasks_test.list().items

    # Get all actors and actor IDs with instagram in the name
    all_with_instagram = []
    instagram_actor_task_ids = []
    for t in list_of_tasks:
        # Look for specific scraping task for scraping Black and Latine/Latinx student org posts
        # Replace name in config.py
        if ApifyAccess.actorName in str.lower(t['name']):
            all_with_instagram.append(t)
            instagram_actor_task_ids.append(t['id'])

    all_runs = client.runs() # Returns a RunCollectionClient
    all_successful_runs = all_runs.list(status='SUCCEEDED',desc=True) #returns a ListPage object

    # Exit if there are no successful runs
    if all_successful_runs.count == 0:
        exit()
    else:
        print("Number of Successful Runs:",all_successful_runs.count)

    # desc = True means all_successful_runs has most recent runs first
    latest_instagram_run = None

    # Get latest instagram run from this task (see above)
    # actorTaskId should be the same
    for a in all_successful_runs.items:
        if a['actorTaskId'] in instagram_actor_task_ids:
            latest_instagram_run = a
            break

    # Runs get deleted after a week
    # Exit if there are no runs scraping instagram data
    if latest_instagram_run == None:
        exit()
    else:
        print("Latest Instagram Run Start Date:",latest_instagram_run['startedAt'])

    latest_run_id = latest_instagram_run['id']
    latest_run = client.run(latest_run_id)
    latest_run_dataset = latest_run.dataset()
    # get usernames, shortcodes, and timestamps in latest run
    all_items = latest_run_dataset.list_items(fields=["ownerUsername,shortCode,timestamp"]).items

    # Make list of tuples with information on each of the posts
    # Each tuple for each post has the format (username, timestamp, shortcode)

    # Sort posts into if in Black or Latine/latinx
    #   - NOTE: The code assumes that if an username is not in one group it is in the other
    #   - tsu: timestamp, shortcode, username
    tsu_black = []
    tsu_lat = []

    for i in all_items:
        added = False
        for j in range(9):
            if len(i.keys()) == 3 and i['ownerUsername'] in BlUsernames.all_users[j]:
                added = True
                tsu_black.append((i['ownerUsername'],i['timestamp'],i['shortCode']))
        if len(i.keys()) == 3 and not added:
            #print(i['ownerUsername'],"latine") #- print debugging
            tsu_lat.append((i['ownerUsername'],i['timestamp'],i['shortCode']))
        
    # Get rid of dupes in each set, then sort so the most recent posts' shortcodes are first
    tsu_black_unique = list(set(tsu_black))
    sorted_tsu_black_unique = sorted(tsu_black_unique, key = lambda t: t[1],reverse = True)

    tsu_lat_unique = list(set(tsu_lat))
    sorted_tsu_lat_unique = sorted(tsu_lat_unique, key = lambda t: t[1],reverse = True)

    # For each list, get unique usernames and shortcodes
    shortcodes_and_users_cleaned_black = []
    for t in sorted_tsu_black_unique:
        shortcodes_and_users_cleaned_black.append((t[0],t[2]))

    shortcodes_and_users_cleaned_lat = []
    for t in sorted_tsu_lat_unique:
        shortcodes_and_users_cleaned_lat.append((t[0],t[2]))

    # Gut checks (assertions)
    assert len(shortcodes_and_users_cleaned_black) == len(sorted_tsu_black_unique)
    assert len(shortcodes_and_users_cleaned_lat) == len(sorted_tsu_lat_unique)

    total_new_unique = len(shortcodes_and_users_cleaned_lat) + len(shortcodes_and_users_cleaned_black)
    print("Number of unique shortcodes scraped: ",total_new_unique)

    # Store old contents of file in one-version backups
    backup_prev_ver("contentcore_bl.js")
    backup_prev_ver("contentcore_lat.js")
    backup_prev_ver("contentpick_bl.js")
    backup_prev_ver("contentpick_lat.js")

    # NOTE: Make sure that in all of the postContent declarations, 
    #       there is at least 1 line break between the left bracket ([) and the first shortCode.

    # Add shortcodes for Black student orgs to corresponding contentcore.js type file
    write_to_contentcore_bl = make_final_file_text_core(shortcodes_and_users_cleaned_black,b=True)
    put_into_file(write_to_contentcore_bl,'contentcore_bl.js')

    # Add shortcodes for Black student orgs to corresponding contentpick.js type file
    write_to_contentpick_bl = make_final_file_text_picker(shortcodes_and_users_cleaned_black,b=True)
    put_into_file(write_to_contentpick_bl,'contentpick_bl.js')

    # Add shortcodes for Latine/Latinx student orgs to corresponding contentcore.js type file
    write_to_contentcore_lat = make_final_file_text_core(shortcodes_and_users_cleaned_lat,b=False)
    put_into_file(write_to_contentcore_lat,'contentcore_lat.js')

    # Add shortcodes for Latine/Latinx student orgs to corresponding contentpick.js type file
    write_to_contentpick_lat = make_final_file_text_picker(shortcodes_and_users_cleaned_lat,b=False)
    put_into_file(write_to_contentpick_lat,'contentpick_lat.js')

if __name__ == "__main__":
    main()
