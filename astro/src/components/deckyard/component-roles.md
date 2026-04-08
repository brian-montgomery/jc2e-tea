
-  CardGrid: Takes set of cards and displays them within a CardView.
   - Makes the links ?
-  CardView: Sets specific space within a page for a card.
   -  Handles rotation and flipping.
   -  Takes Dimensions and a Card
- CardFrame: Renders card within a border.
   -  No knowledge of Card Collection.


Notes
-  Deck: Add stylesheet or components?


CardGrid also should make them the needed 1x2 for the Splash Page.


// TODO: Change transform and rotation to be on the outer most element.
/*
  Outside sets dimensions (and border) on page.
  Inside set rotation/flip (if needed).
  Inside sets background.
  Next sets bleed.

<div class="card-view">
  <div class="card-frame">
  </div>
</div>

*/