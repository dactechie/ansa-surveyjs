<template name="MainInstructions">
  <div
    class="m-10  invisible md:visible md:col-span-2 shadow-md rounded-lg p-2 rounded-bl-3xl bg-gradient-to-b from-green-100 to-blue-100"
  >
    <!-- <div v-if="showInstructions"> -->
    <div class="pl-5 my-5 mx-5 mb-5">
      <span class="font-semibold">
        Start by entering your client's SLK using the search function on the
        left.</span
      >
    </div>

    <div class="pl-5 mx-5 mb-5">
      You'll be prompted to create a new ATOM, if the client doesn't exist
    </div>
    <div class="pl-5 mx-5 mb-5">
      If you have previously started/completed one/more ATOM(s) for a client, a
      table of previous ATOMs will be shown below. Click on a row to see the
      submission details.
    </div>
    <div class="pl-5 mx-5 mb-5">
      <span class="font-semibold underline">Notes: </span>
      <ul class="list-disc">
        <li>
          When possible (and appropriate), it will
          <span class="font-semibold text-red-500">pre-fill data</span>
          from the latest assessment.
        </li>
        <li>
          <span class="font-semibold">Summary Notes and Goals</span> for each
          domain will not pre-fill. Please review with your client and updated
          accordingly.
        </li>
      </ul>
    </div>
  </div>
</template>
