so after nailing down what i hope to be the permanent file structure i had to add [[...rest]] folders to the signup and signin pages code,i thought this would change something but it seems to have only gotten rid of a seemingly non urgent issue in the nextjs debugger module that remains in the bottom left regarding the folder being catch all.

i have established a raccoon as my favicon calling card

im working on profiles only showing in nav to access when signed in via "isSignedIn" being true if user is signed in and false if not,it will render profiles,my profile and sign out links when signed in and the home,sign in and sign up links when false

i did take a stab at a delete button that shows only for whoever posted the post but that seems to be harder than anticipated

also failed at making avatar imgs uploadable so scrapped it completely as it wastes way too much time stumbling over the issues,ive instead opted for first letter of username avatars

ive also attempted to use the database term "upsert" which combines insert and update functionalities.It attempts to update an existing record, and if that record doesn't exist, it inserts a new one

basic error checks have been integrated as before in the form of checking and http codes

ive opted for a dropdown radix component

on top of this i will add you need to be signed in for the component to work or you will only see home sign in and sign up on the nav

the dropdown component likes to run away from the mouse right now so thats fun

the css also takes a while to kick in sometimes and can unload on manual refresh at times despite the import being at the top of the files but this is feeling out of my depth at the minute added with the flickering radix component,ive been at this alot longer than expected or wanted.the css can also appear warped until manual refresh so its not seemingly the most stable despite efforts

im prepared to take the possible point loss at this point for it,butttt it does work past the first page if you can catch it which doubles as a minigame

i even think i got some imports mixed up to be honest but ive bitten off way more than i can chew multiple times on this one and its currently 9pm sunday as i write this,ive been messing around with this since lunchtime
